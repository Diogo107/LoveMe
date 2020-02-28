'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('./../models/user');
const Animal = require('./../models/animal');

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

router.get('/single-animal/profile/:userId', (req, res, next) => {
  let userId = req.params.userId;
  console.log('...............................................');
  Animal.find({ user: `${userId}` }).then(animal => {
    console.log(animal);
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    res.render('profile-open', { animal });
  });
});

module.exports = router;
