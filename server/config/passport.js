var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    process.nextTick(function() {
      User.findOne({ 'email': email }, function(err, user) {
        if(err)
          return done(err);
        if(!user)
          return done(null, false, req.flash('loginMessage', 'No User found!!!'));
        if(!user.validPassword(password))
          return done(null, false, req.flash('loginMessage', 'Invalid password'));
        return done(null, user);
      });
    });
  }));
}
