'use strict'

var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
models = require('../../server/models');

module.exports = function(app){
  // Serialize

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Deserialize

  passport.deserializeUser(function(user, done) {
    models.user.findById(user.id, function(err, user) {
      done(err, user);
    });
  });

  // For login purposes

  passport.use('local', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    function(username, password, done){
      models.user.findOne({ where: {username: username} }).then(function(user){
        if (!user) {
          console.log("USER NOT FOUND");
          return done(null, false, {
            message: "User not registered"
          });
        }
        if (!user.validPassword(password)) {
          return done(null, false, {
            message: "Invalid password, try again"
          });
        }
        return done(null, user);
      });
    }
  ));

// For Signup purposes

  passport.use('local-signup', new LocalStrategy({
      passReqToCallback: true,
      usernameField: 'username',
      passwordField: 'password'
    },
    function(req, username, password, done){
      models.user.create({
        username: username,
        password: password
      }).then(function(user) {
        console.log(user);
        return done(null, user);
      }).catch(function(err) {
        return done(null, false, {
          message: err
        });
      });
    }
  ));

}
