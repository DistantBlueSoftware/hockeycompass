const passport = require('passport');
const User = require('../models/User');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localLogin = new LocalStrategy({usernameField: 'usernameOrEmail'}, function(usernameOrEmail, password, done) {
  // try username match first
  User.findOne({ username: usernameOrEmail }, function(err, user) {
    if (err) { return done(err); }
    if (user) {
      user.comparePassword(password, function(err, isMatch) {
        if (err) { return done(err); }
        if (!isMatch) { return done(null, false); }
        
        return done(null, user);
      });
    } else {
      //try email match
      User.findOne({ email: usernameOrEmail }, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }

        // compare passwords - is `password` equal to user.password?
        user.comparePassword(password, function(err, isMatch) {
          if (err) { return done(err); }
          if (!isMatch) { return done(null, false); }

          return done(null, user);
        });
      });
    }
  })

});

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // See if the user ID in the payload exists in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
