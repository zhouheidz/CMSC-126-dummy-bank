const passport = require('passport');
const TwitterPassport = require('passport-twitter');
const GitHubPassport = require('passport-github2');
const User = require('../models').User;

passport.use(new TwitterPassport({
    consumerKey: '7mNd39P1eKcfpBF42skNxU6gV',
    consumerSecret: 'ng5453RTqS1ltO7AWyowl53RYk6KMqqRK72gpOq5Plm7QRmME0',
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
}, function(token, secret, profile, cb) {
    User.findOrCreate({
        where: { email: profile.username },
        defaults: { password: '', name: profile.displayName  }
    }).then(function(result) {
        cb(null, result[0]);
    });
}));

passport.use(new GitHubPassport({
    clientID: 'd7933df81b8801ac231a',
    clientSecret: '9f565026c01297b9d2f6b695a5939c67be20ed50',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({
      where: { email: profile.username },
      defaults: { password: '', name: profile.displayName }
    }).then(function(result){
      done(null, result[0]);
    });
  }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({ where: { id: id } }).then(function(user) {
        done(null, user);
    });
});

module.exports = passport;
