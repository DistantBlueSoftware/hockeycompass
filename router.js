const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_TEST);
const Nexmo = require('nexmo');
const emailService = require('./emailService');

const passport = require('passport');
const moment = require('moment');

const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');

const Game = require('./models/Game');
const User = require('./models/User');
const Venue = require('./models/Venue');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

const postStripeCharge = (res, game, user) => (stripeErr, stripeRes) => {
  if (stripeErr) {
    console.log(stripeErr)
    res.status(500).send({ error: stripeErr });
  } else {
    console.log(stripeRes)
    res.status(200).send({ success: stripeRes });
  }
}
router.post('/save-stripe-token', function (req, res, next) {
  const { token, amount, game, user } = req.body;
  const convertedAmount = amount * 100;
  stripe.charges.create({source: token.id, amount: convertedAmount, currency: 'usd'}, postStripeCharge(res, game, user))
});

router.post('/login', requireSignin, Authentication.signin);
router.post('/register', Authentication.signup);

router.get('/games', (req, res, next) => {
  Game.find({})
    .then(games => res.json(games))
    .catch((err) => next(err));
});

router.post('/games', function (req, res, next) {
  const { name, date, type, location, host, maxPlayers } = req.body;
  const game = new Game({
    name,
    date,
    type,
    location,
    host,
    maxPlayers,
    players: [host]
  });

  game.save()
    .then(() => res.json(game))
    .catch((err) => next(err));
});

router.get('/games/:id', (req, res, next) => {
  Game.findById(req.params.id)
    .exec()
    .then((game) => res.json(game))
    .catch((err) => next(err));
});

router.delete('/games/:id', function (req, res, next) {
  Game.findOneAndRemove({ _id: req.params.id })
    .exec()
    .then((game) => res.json())
    .catch((err) => next(err));
});

router.put('/games/:id', (req, res, next) => {
  Game.findById(req.params.id)
    .exec()
    .then((game) => {
      game.players.push(req.body.username);
      game.save()
        .then(() => {
          if (game.host !== req.body.username) {
            emailService.send({
              template: 'join-game',
              message: {
                to: req.body.email
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
          User.findOne({username: game.host})
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
                  first: req.body.first,
                  last: req.body.last
                }
              })
              .then(console.log)
              .catch(console.error);
            })

          }

          res.json(game);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

router.put('/games/:id/drop', (req, res, next) => {
  Game.findById(req.params.id)
    .exec()
    .then((game) => {
      const playerIndex = game.players.indexOf(req.body.username);
      game.players = [...game.players.slice(0, playerIndex), ...game.players.slice(playerIndex + 1)];
      game.save()
        .then(() => res.json(game))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

router.post('/games/:id/notification', (req, res, next) => {
  //email notifications
  const isPrivate = req.body.type && req.body.type.toLowerCase() === 'private';

  if (isPrivate) {
    User.findOne({username: req.body.host})
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
                              .filter(user => req.body.players.indexOf(user.username) === -1)
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

router.put('/user/:username', (req, res, next) => {
  User.findOne({username: req.params.username})
    .exec()
    .then(user => {
      
      user.profile = {...req.body};
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


router.put('/venue', (req, res, next) => {
  const venueId = req.body._id;
  const updatedVenue = req.body;
  delete updatedVenue['lastUpdated'];
  Venue.findOneAndUpdate(
    { _id: venueId },
    {
      $set: { ...updatedVenue },
      $currentDate: { lastUpdated: true },
      
    },
    {new: true}
  ).exec()
  .then((venue) => {    
    res.json(venue);
  }).catch((err) => {
    next(err);
  })
});

router.put('/games/:id/drop', (req, res, next) => {
  Game.findById(req.params.id)
    .exec()
    .then((game) => {
      const playerIndex = game.players.indexOf(req.body.username);
      game.players = [...game.players.slice(0, playerIndex), ...game.players.slice(playerIndex + 1)];
      game.save()
        .then(() => res.json(game))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

module.exports = router;
