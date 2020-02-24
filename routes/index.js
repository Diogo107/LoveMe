'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hello World!' });
});

/* router.get('/animal/search-list', routeGuard, (req, res, next) => {
  res.render('animal/search-list');
}); */

module.exports = router;
