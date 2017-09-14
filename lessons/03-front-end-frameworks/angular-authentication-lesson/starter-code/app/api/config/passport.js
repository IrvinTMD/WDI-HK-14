var LocalStrategy = require('passport-local').Strategy;
var Agent         = require("../models/agent");
var jwt           = require('jsonwebtoken');

module.exports = function(passport) {
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'codename',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, codename, password, done) {
    process.nextTick(function() {
      Agent.findOne({ 'codename' : codename }, function(err, agent) {

        if (err) return done(err);
        if (agent) return done(null, false);

        var newAgent       = new Agent();
        newAgent.codename  = codename;
        newAgent.realname  = req.body.realname;
        newAgent.status    = req.body.status;
        newAgent.location  = req.body.location;
        newAgent.password  = newAgent.encrypt(password);

        newAgent.save(function(err) {
          if (err) return done(err);
          return done(null, newAgent);
        });
      });
    });
  }));
}