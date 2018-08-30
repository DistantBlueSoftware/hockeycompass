const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Nexmo = require('nexmo');
const Email = require('email-templates');
const passport = require('passport');

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
      //update game

      game.save()
        .then(() => res.json(game))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});
router.post('/games/:id/notification', (req, res, next) => {
  //email notifications
  //get list of all player emails, then filter out ones that are already in the game
  console.log(req.body)
  const allUsers = [{name: 'steve', email: 'steve@steve.com'}]
  const playerEmails = allUsers.filter(user => req.body.players.indexOf(user.name) == -1).map(user => user.email).toString();
  console.log(playerEmails)
  //test account for dev
  nodemailer.createTestAccount((err, account) => {
    if (err) {
            console.error('Failed to create a testing account. ' + err.message);
            return process.exit(1);
        }
      console.log('Credentials obtained, sending message...');
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
              user: account.user, // generated ethereal user
              pass: account.pass // generated ethereal password
          }
      });
      let mailOptions = {
          from: '"Hockey Compass" <no-reply@hockeycompass.com>', // sender address
          to: playerEmails, // list of receivers
          subject: ``, // Subject line
          text: `A game near you is looking for players!
          Name: ${req.body.name}
          Date: ${req.body.date}
          Location: ${req.body.location}
          Details and join here: http://${process.env.ROOT_URL}/game/join/${req.params.id}`, // plain text body
          html: `` // html body
      };

      // send mail with defined transport object
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

      email
  .send({
    template: 'notify-all',
    message: {
      to: 'elon@spacex.com'
    },
    locals: {
      name: req.body.name,
      date: req.body.date,
      location: req.body.location,
      url: process.env.ROOT_URL,
      id: req.params.id
    }
  })
  .then(console.log)
  .catch(console.error);
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);
          // Preview only available when sending through an Ethereal account
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      });


    });

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
});


module.exports = router;
