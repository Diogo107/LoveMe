'use strict';

const { Router } = require('express');

const passport = require('passport');

const routeGuard = require('./../middleware/route-guard');

const router = new Router();

router.get('/search-list', (req, res, next) => {
  res.render('animal/search-list');
});

router.get('/register-animal', (req, res, next) => {
  res.render('animal/register-animal');
});

module.exports = router;
