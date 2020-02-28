'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('./../models/user');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'PICKME!' });
});

router.get('/authentication/confirm-email', (req, res, next) => {
  res.render('authentication/confirm-email');
});

router.get('/confirm-email/:userId', (req, res, next) => {
  const userId = req.params.userId;
  console.log('Am I here?', userId);
  const validation = { validation: true };

  User.findByIdAndUpdate(userId, validation).then(() => {
    res.render('authentication/profile');
  });
});

module.exports = router;
