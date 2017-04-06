/* global InstagramUserService, User, require, Invitee, sails */

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  //If using MongoDB, if other you will need JS specific to that schema
  Admin.findOne({'id': id})
    .populateAll()
    .then(function (user) {
      var err = null;
      return done(err, user);
    }, function (err) {
      var user = null;
      return done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  passReqToCallback : true
  },

  function (req, username, password, done) {
    console.log("test");
    Admin
      .getForEmailPasswordV2({
        email: username,
        password: password
      })
      .then(function(user) {
        return done(null, user);
      })
      .catch(function(err) {
        console.log("@passport :: Error :: ", err);
        // TODO: check for the error code and set the flash message accordingly
        return done(err, null);
      });
  })
);
