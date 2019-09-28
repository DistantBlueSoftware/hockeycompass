const jwt = require("jwt-simple");
const User = require("../models/User");
const config = require("../config");
const emailService = require("../emailService");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
  const { username } = req.user;
  User.findOne({ username: username })
    .exec()
    .then(user => {
      user.metrics.loginCount = user.metrics.loginCount + 1;
      user
        .save()
        .then(user => {
          const {
            email,
            firstName,
            lastName,
            metrics,
            phone,
            profile,
            username,
            zipCode,
            _id,
            role
          } = user;
          res.json({
            email,
            firstName,
            lastName,
            metrics,
            phone,
            profile,
            username,
            zipCode,
            _id,
            role,
            token: tokenForUser(req.user)
          });
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));
};

exports.signup = function(req, res, next) {
  const {
    email,
    password,
    username,
    firstName,
    lastName,
    nickname,
    zipCode,
    profile,
    metrics
  } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide email and password" });
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: "Email is in use" });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User(req.body);

    user.save(function(err) {
      if (err) {
        return next(err);
      }

      //send registration email
      emailService
        .send({
          template: "welcome",
          message: {
            to: email
          },
          locals: {
            name: `${firstName} ${lastName}`,
            username: username,
            url: process.env.ROOT_URL
          }
        })
        .then(console.log)
        .catch(console.error);

      // Repond to request indicating the user was created
      res.json({
        email,
        username,
        firstName,
        lastName,
        nickname,
        profile,
        zipCode,
        metrics,
        token: tokenForUser(user)
      });
    });
  });
};
