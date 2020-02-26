'use strict';

const { Router } = require('express');
const passport = require('passport');
const Animal = require('./../models/animal');
const routeGuard = require('./../middleware/route-guard');
const User = require('./../models/user');
const uploader = require('./../middleware/upload-files');
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

//edit

router.get('/edit', (req, res, next) => {
  res.render('authentication/edit');
});

router.post('/edit', uploader.array('picture', 10), (req, res, next) => {
  const urls = req.files.map(file => {
    return file.url;
  });
  console.log(urls);
  const userId = req.user._id;
  const { name, email, address, picture } = req.body;
  User.findByIdAndUpdate(userId, {
    name,
    email,
    address,
    picture: urls
  })
    .then(() => {
      res.redirect('/authentication/profile');
    })
    .catch(error => {
      next(error);
    });
});

router.post(
  '/sign-in',
  passport.authenticate('local-sign-in', {
    successRedirect: '/authentication/profile',
    failureRedirect: '/sign-in'
  })
);

//delete

router.post('/profile/delete', routeGuard, (req, res, next) => {
  console.log(req);
  const delUser = req.user.id;
  User.findByIdAndDelete(delUser)
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    });
});

router.post('/sign-out', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
