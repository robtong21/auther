'use strict';
var User = require('./users/user.model');

var router = require('express').Router();

router.use('/users', require('./users/user.router'));

router.use('/stories', require('./stories/story.router'));

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
      console.log(req.session)
      req.session.userId = user.id
      res.status(200).json(user);
    }
  })
  .catch(next);
});

module.exports = router;
