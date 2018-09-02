const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Nexmo = require('nexmo');
const Email = require('email-templates');
const passport = require('passport');
const moment = require('moment');

const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');

const Game = require('./models/Game');
const User = require('./models/User');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

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

router.delete('/games/:id', requireAuth, function (req, res, next) {
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
        .then(() => res.json(game))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});
router.post('/games/:id/notification', (req, res, next) => {
  //email notifications
  //get all users emails, then filter out those that are already in the game
  User.find()
    .exec()
    .then(users => {
      const playerEmails = users
                            .filter(user => req.body.players.indexOf(user.username) === -1)
                            .map(user => user.email)
                            .toString();

      const mg = new Mailgun(process.env.MAILGUN_API_KEY);
      const email = new Email({
        message: {
          from: '"Hockey Compass" <no-reply@hockeycompass.com>'
        },
        // uncomment below to send emails in development/test env:
        send: true,
        transport: {
          jsonTransport: true
        }
      });

      email.send({
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


});


module.exports = router;
