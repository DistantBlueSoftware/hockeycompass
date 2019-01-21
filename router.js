const express = require('express');
const router = express.Router();
const request = require('request');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_TEST);
const Nexmo = require('nexmo');
const emailService = require('./emailService');

const passport = require('passport');
const moment = require('moment');
const tz = require('moment-timezone');
const _ = require('underscore');

const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');

const Game = require('./models/Game');
const User = require('./models/User');
const Venue = require('./models/Venue');
const EmailQueue = require('./models/EmailQueue');
const Payment = require('./models/Payment');

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
let BATCH_ID = 1547093985518;
let NEWTOKEN = null;

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const postStripeCharge = (res, game, user) => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}
router.post('/save-stripe-token', function (req, res, next) {
  const { token, amount, game, user } = req.body;
  const convertedAmount = amount * 100;
  if (!token) {
    res.status(500).send({error: 'Error: payment info not valid or not provided.'});
    return;
  }
  stripe.charges.create({
    source: token.id, 
    amount: convertedAmount, 
    currency: 'usd',
  }, postStripeCharge(res, game, user))
});

router.post('/create-payment', (req, res, next) => {
  stripe.charges.create({
    amount: 1000,
    currency: 'usd',
    source: 'tok_visa',
    destination: {
      account: req.userStripeToken || 'acct_1DPKXrCKzu6eM4DO',
    },
    application_fee: 100,
  })
  .then(function(charge) {
    console.log(charge);
    res.send(200);
  });
});

router.post('/login', requireSignin, Authentication.signin);
router.post('/register', Authentication.signup);

router.get('/games', (req, res, next) => {
  Game.find({})
    .then(games => res.json(games))
    .catch((err) => next(err));
});

router.post('/games', function (req, res, next) {
  const { name, date, type, location, host, hostID, currentPlayer, invited, maxPlayers, costPerPlayer, goalieCount, emailList } = req.body;
  const game = new Game({
    name,
    date,
    type,
    location,
    host,
    maxPlayers,
    goalieCount,
    hostID,
    invited: emailList && emailList.length ? emailList : [],
    costPerPlayer,
    players: [{name: currentPlayer.name, type: currentPlayer.type || 'player'}]
  });

  game.save()
    .then(game => {
      if (game.type === 'public') {
        //add game to email queue
        const notification = new EmailQueue({
          gameID: game._id,
          sendDate: moment(game.date).subtract(1, 'days')
        });
      notification.save()
        .catch(err => next(err));
      } else {
        //send new game email to email list
        emailService.send({
          template: 'notify-private',
          message: {
            to: 'no-reply@hockeycompass.com',
            bcc: emailList
          },
          locals: {
            name: req.body.name,
            host: host,
            date: moment(req.body.date).tz('America/Chicago').format('MM/DD/YYYY h:mmA'),
            location: req.body.location,
            url: process.env.ROOT_URL,
            id: game._id
          }
        })
        .then(console.log)
        .catch(console.error);
      }
      //return game info to client  
      res.json(game);
    })
    .catch((err) => next(err));
});

router.get('/games/:id', (req, res, next) => {
  Game.findById(req.params.id)
    .exec()
    .then((game) => res.json(game))
    .catch((err) => next(err));
});

router.put('/games/:id', (req, res, next) => {
  let hasMeaningfulChanges = false;
  Game.findById(req.params.id)
    .exec()
    .then(game => {
      for (const key of Object.keys(req.body)) {
        if(game[key]!== req.body[key]) {
          if (key === 'location') hasMeaningfulChanges = true;
          if (key === 'date' && !moment(game[key]).isSame(req.body[key])) hasMeaningfulChanges = true;
          game[key] = req.body[key];
        }
      }
      game.save()
        .then(async game => {
          if (hasMeaningfulChanges) {
            //get emails for joined users
            //TODO: This is broken - player is an object and doesn't have username field (should)
            let emailList = [];
            for (const player of game.players) {
              await User.findOne({username: player.username})
                .exec()
                .then(user => emailList.push(user.email))
            }
          
            emailService.send({
              template: 'game-updated',
              message: {
                bcc: emailList
              },
              locals: {
                name: game.name,
                date: moment(game.date).format('MM/DD/YYYY h:mmA'),
                location: game.location,
                url: process.env.ROOT_URL,
                id: req.params.id
              }
            })
            .then(console.log)
            .catch(console.error);
          }
          
          res.json(game)
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

router.delete('/games/:id', function (req, res, next) {
  Game.findOneAndDelete({ _id: req.params.id })
    .exec()
    .then((game) => res.json(game))
    .catch((err) => next(err));
});

router.put('/games/:id/add', (req, res, next) => {
  const { fullName, profile, username } = req.body;
  Game.findById(req.params.id)
    .exec()
    .then(game => {
      game.players.push({username, name: fullName, type: profile.playerType});
      game.save()
        .then(game => {
          //if player is not game host, send join game email
          if (game.host !== username) {
            emailService.send({
              template: 'join-game',
              message: {
                to: req.body.email
              },
              locals: {
                name: game.name,
                date: moment(game.date).format('MM/DD/YYYY h:mmA'),
                location: game.location,
                urlQuery: `${game.location.split(' ').join('+')}+MN`,
                url: process.env.ROOT_URL,
                id: req.params.id
              }
            })
            .then(console.log)
            .catch(console.error);
          //send email to host informing them that a player has joined
          User.findOne({username: game.hostID || game.host})
            .exec()
            .then(user => {
              emailService.send({
                template: 'new-player-email-to-host',
                message: {
                  to: user.email
                },
                locals: {
                  name: game.name,
                  date: moment(game.date).format('MM/DD/YYYY h:mmA'),
                  location: game.location,
                  numOfPlayers: game.players.length,
                  openings: game.maxPlayers - game.players.length,
                  playerInfo: req.body
                }
              })
              .then(console.log)
              .catch(console.error);
              
              user.profile.payments.push({
                game: game.name, 
                from: req.body.username, 
                amount: game.costPerPlayer
              });
              user.save()
                .catch(err => next(err));
            })
            .catch(err => next(err));
            //create a record for future payout to host 
            const paymentDetail = new Payment({
              gameID: game._id,
              gameHost: game.host,
              payer: req.body.username,
              payoutDate: game.date,
              amount: game.costPerPlayer,
            });
            paymentDetail.save()
              .catch(err => next(err));
          }
          res.json(game)
        })
        .catch(err => next(err));
    })
    .catch((err) => next(err));
});

router.put('/games/:id/drop', (req, res, next) => {
  Game.findById(req.params.id)
    .exec()
    .then(game => {
      const playerIndex = game.players.map(p => p.username).indexOf(req.body.username);
      game.players = [...game.players.slice(0, playerIndex), ...game.players.slice(playerIndex + 1)];
      game.save()
        .then(game => res.json(game))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

router.put('/games/:id/cancel', (req, res, next) => {
  Game.findById(req.params.id)
    .exec()
    .then(game => {
      game.active = false;
      game.save()
        .then(game => {
          //TODO: send cancelled email to players roster
          res.json(game);
        })
        .catch((err) => next(err));
    })
    .catch(err => next(err));
});

router.post('/games/:id/notification', (req, res, next) => {
  //email notifications
  const isPrivate = req.body.type && req.body.type.toLowerCase() === 'private';

  if (isPrivate) {
    User.findOne({username: req.body.hostID || req.body.host})
      .exec()
      .then(user => {
        emailService.send({
          template: 'contact-host',
          message: {
            to: user.email,
            replyTo: req.body.email
          },
          locals: {
            name: req.body.name,
            playerName: req.body.playerName,
            message: req.body.message
          }
        })
      })
  } else {
    //get all users emails, then filter out those that are already in the game
    User.find()
      .exec()
      .then(users => {
        const playerEmails = users
                              .filter(user => user.profile.notify)
                              .filter(user => req.body.players.map(p => p.username).indexOf(user.username) === -1)
                              .map(user => user.email)
                              .toString();
        emailService.send({
          template: 'notify-all',
          message: {
            to: 'no-reply@hockeycompass.com',
            bcc: playerEmails
          },
          locals: {
            name: req.body.name,
            date: moment(req.body.date).format('MM/DD/YYYY h:mmA'),
            location: req.body.location,
            url: process.env.ROOT_URL,
            id: req.params.id
          }
        })
        .then(console.log)
        .catch(console.error);

        //SMS notifications through Nexmo
        // const nexmo = new Nexmo({
        //   apiKey: process.env.NEXMO_KEY,
        //   apiSecret: process.env.NEXMO_SECRET
        // });
        // nexmo.message.sendSms(
        //   process.env.NEXMO_VIRTUAL_NUMBER, '17737327335', `🏒 Message from Hockey Compass 🏒:
        // A Game near you is looking for players!
        // Date: ${req.body.date}
        // Location: ${req.body.location}
        // Details and join here: http://${process.env.ROOT_URL}/game/join/${req.params.id}` ,
        //     (err, responseData) => {
        //       if (err) {
        //         console.log(err);
        //       } else {
        //         console.dir(responseData);
        //       }
        //     }
        // )
        res.json({message: 'Message Sent'});
      })
      .catch((err) => next(err));
    }

});

router.get('/payoutsTotal', (req, res, next) => {
  Payment.find({paid: false})
    .exec()
    .then(payouts => res.json(payouts.map(p => p.amount).reduce((a,b) => a + b)))
    .catch(e => next(e));
});

router.get('/sendPayouts', (req, res, next) => {
  Payment.find({paid: false})
    .exec()
    .then(async payments => {
      let items = [];
      const usernames = _.uniq(payments, 'gameHost').map(p => p.gameHost);
      await asyncForEach(usernames, async u => {
        await User.findOne({username: u})
          .exec()
          .then(user => {
            if (user) {
              const grandTotal = user.profile.payments.map(p => p.amount).reduce((a, b) => a + b);
              items.push({
                "recipient_type": "EMAIL",
                "amount": {
                  "value": grandTotal.toFixed(2),
                  "currency": "USD"
                },
                "receiver": user.profile.payoutsEmail || user.email,
                "note": "Thanks for using Hockey Compass!"
              });
            }
          })
      });
      const options = {
        "strictSSL": false,
        "url": "https://api.sandbox.paypal.com/v1/payments/payouts",
        "method": "POST",
        "headers": {
          "Accept": "application/json",
          "Authorization": `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        },
        "body": {
          "sender_batch_header": {
            "email_subject": "[Hockey Compass] 🏒 You've Been Paid! 🏒",
            "sender_batch_id": `batch-${BATCH_ID}`
          },
          "items": items
        },
        "json": true
      };

      request(options, (error, response, body) => {
        /* Print the error if one occurred */
        console.log('error:', error);
      
        /* Print the response status code if a response was received */
        console.log('statusCode:', response && response.statusCode);
      
        /* Print the response body */
        console.log('body:', body);
        res.json(items)
        // payments.forEach(p => {
        //   p.paid = true;
        //   p.save();
        // })
        BATCH_ID++;
      });
      
    })
    .catch(err => next(err))
});

router.post('/payouts', (req, res, next) => {
  let pbg = [];
  console.log(req.body)
  // req.body.forEach(game => {
  //   Payment.find({gameID: game._id})
  //     .exec()
  //     .then(payments => {
  //       res.json(payments)
  //     })
  // })
})

router.get('/paypal-token', (req, res, next) => {
  const accessOptions = {
    "strictSSL": false,
    "url": "https://api.sandbox.paypal.com/v1/oauth2/token",
    "method": "POST",
    "auth": {
      "user": "AViNcnTmPaYZ3VltsmWEN3UmogFcZnjKsnqaitDo2cHrEEl1Rlns4GSz36CSUl69q9eADJwEItR0Rq7M",
      "pass": "EGaXgsg81ztam1dWliT7pUgKILzfgXJlEvnnlfwmM9PCwnbLL9ZplNYKSGW-oeI1BnEClmhVazadRkDV",
      "sendImmediately": true
    },
    "headers": {
      "Accept": "application/json",
      "Accept-Language": "en_US",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    "form": {
      "grant_type": "client_credentials"
    }
  };

  request(accessOptions, (error, response, body) => {
    /* Print the error if one occurred */
    console.log('error:', error);

    /* Print the response status code if a response was received */
    console.log('statusCode:', response && response.statusCode);

    /* Print the response body */
    console.log('body:', body);
    
    NEWTOKEN = body.access_token;
  });
});

router.put('/user/:username', (req, res, next) => {
  User.findOne({username: req.params.username})
    .exec()
    .then(user => {
      for (const prop in req.body) {
        user.profile[prop] = req.body[prop];
      }
      user.save()
        .then(user => res.json(user.profile))
        .catch(err => next(err));
    })
    .catch(err => next(err));
});

router.get('/venues', (req, res, next) => {
  Venue.find({})
    .then(venues => res.json(venues))
    .catch((err) => next(err));
});

router.post('/venue', (req, res, next) => {
  const venue = new Venue({
    ...req.body
  });

  venue.save()
    .then(() => res.json(venue))
    .catch((err) => next(err));
});

router.get('/activePayments', (req, res, next) => {
  Payment.find({paid: false})
    .then(payments => res.json(payments))
    .catch((err) => next(err));
});

module.exports = router;
