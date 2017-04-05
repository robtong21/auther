'use strict';
var User = require('./users/user.model');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var router = require('express').Router();

router.use('/users', require('./users/user.router'));

router.use('/stories', require('./stories/story.router'));

router.get('/auth/me', function (req, res, next) {
  res.status(200).json(req.session)
})

passport.serializeUser(function (user, done) {
  const serial = [user.id, user.isAdmin]
  done(null, serial)
})

passport.deserializeUser(function (id, done) {
  User.findById(id[0])
  .then(user => {
    done(null, user)
  })
  .catch(done)
});

passport.use(
  new GoogleStrategy({
    clientID: '306912746021-vbc1bid56r146ttg8vpvdtrfrlg3rbl2.apps.googleusercontent.com',
    clientSecret: 'yATjgOWEHOJiR86S785T-sU1',
    callbackURL: '/api/auth/google/callback'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
    // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
    /*
    --- fill this part in ---
    */
    console.log('---', 'in verification callback', profile, '---');
    console.log('email', profile.emails[0].value)
    User.findOrCreate({
      where: {
        googleId: profile.id
      },
      defaults: {
        email: profile.emails[0].value,
        name: profile.displayName,
        photo: profile.photos ? profile.photos[0].value : undefined
      }
    })
    .spread(user => {
      done(null, user)
    })
    .catch(done)
  })
);

// Google authentication and login 
router.get('/auth/google', passport.authenticate('google', { scope: 'email' }));

// handle the callback after Google has authenticated the user
router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/', // or wherever
    failureRedirect: '/' // or wherever
  })
);

router.post('/login', function (req, res, next) {
  User.findOne(
    {where: {
      email: req.body.email,
      password: req.body.password}
    }
  ) 
  .then(function (user) {
    if (!user) {
      res.sendStatus(401);
    } else {
      req.session.userId = user.id
      req.session.isAdmin = user.isAdmin
      res.status(200).json(user);
    }
  })
  .catch(next);
});

router.post('/signup', function (req, res, next) {
  User.create({
      email: req.body.email,
      password: req.body.password
    }) 
  .then(function (user) {
      res.status(200).json(user);
  })
  .catch(next);
});

router.post('/logout', function (req, res, next) {
    req.session.destroy();
    res.status(200);
});

module.exports = router;
