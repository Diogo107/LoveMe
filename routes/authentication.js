'use strict';

const { Router } = require('express');
const passport = require('passport');
const Animal = require('./../models/animal');
const routeGuard = require('./../middleware/route-guard');
const router = new Router();

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

router.post(
  '/sign-up',
  passport.authenticate('local-sign-up', {
    successRedirect: '/authentication/profile',
    failureRedirect: '/sign-up'
  })
);

router.get('/sign-in', (req, res, next) => {
  res.render('sign-in');
});

router.get('/profile', routeGuard, (req, res, next) => {
  console.log(req.user._id);
  let userId = req.user._id;
  Animal.find({ user: `${userId}` }).then(animal => {
    res.render('authentication/profile', { animal });
  });
});

router.post(
  '/sign-in',
  passport.authenticate('local-sign-in', {
    successRedirect: '/authentication/profile',
    failureRedirect: '/sign-in'
  })
);

router.post('/sign-out', routeGuard, (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
