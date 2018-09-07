const jwt = require('jwt-simple');
const User = require('../models/User');
const config = require('../config');
const emailService = require('../emailService');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  const { username, email, name } = req.user;
  res.send({ username, email, name, token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
  const { email, password, username, name } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'});
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({
      email: email,
      password: password,
      username: username,
      name: name
    });
    user.save(function(err) {
      if (err) { return next(err); }

      //send registration email
      emailService.send({
        template: 'welcome',
        message: {
          to: email
        },
        locals: {
          name: name,
          username: username,
          url: process.env.ROOT_URL
        }
      })
      .then(console.log)
      .catch(console.error);

      // Repond to request indicating the user was created
      res.json({ email: email, username: username, name: name, token: tokenForUser(user) });
    });
  });
}
