'use strict';

const { Router } = require('express');
const passport = require('passport');
const Animal = require('./../models/animal');
const routeGuard = require('./../middleware/route-guard');
const User = require('./../models/user');
const uploader = require('./../middleware/upload-files');
const nodemailer = require('nodemailer');
const router = new Router();
const EMAIL = 'pick.me.today.adoption@gmail.com';
const PASSWORD = 'adoption123';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

router.post(
  '/sign-up',
  passport.authenticate('local-sign-up', {
    successRedirect: '/authentication/confirm-email',
    failureRedirect: '/sign-up'
  })
);

router.get('/sign-in', (req, res, next) => {
  res.render('sign-in');
});

router.get('/profile', (req, res, next) => {
  console.log(req.user);
  let userId = req.user._id;
  if (req.user.validation) {
    Animal.find({ user: `${userId}` }).then(animal => {
      res.render('authentication/profile', { animal });
    });
  } else {
    res.render('authentication/email-not-confirmed');
  }
});

router.post('/email-resent', (req, res, next) => {
  let emailGiven = req.body;
  console.log('Resent the email to confirm', emailGiven);
  User.find(emailGiven)
    .then(user => {
      console.log('Resent the email to confirm', user[0]);
      console.log('Resent the email to confirm', user[0].email);
      return transporter.sendMail({
        from: `Jan20 Test <${user[0].email}>`,
        to: `${user[0].email}`,
        //to: 'diogo.filipe.santos107@gmail.com',
        subject: 'Email Resent',
        // text: 'Hello world!'
        html: `Click the link to confirm your Email. ${process.env.WORKING_URL}/confirm-email/${user[0]._id}`
      });
    })
    .then(() => {
      res.render('index');
    });
});

router.get('/profile/delete/:deleteAnimal', routeGuard, (req, res, next) => {
  let deleteAnimal = req.params.deleteAnimal;
  let userId = req.user._id;
  Animal.findByIdAndDelete(deleteAnimal).then(() => {
    Animal.find({ user: `${userId}` }).then(animal => {
      console.log('Im here!');
      res.render('authentication/profile', { animal });
    });
  });
});

//edit

router.get('/edit', (req, res, next) => {
  res.render('authentication/edit');
});

router.post('/edit', uploader.single('picture'), (req, res, next) => {
  const url = req.file.url;
  console.log(req.file);
  const userId = req.user._id;
  const { name, email, address, picture } = req.body;
  User.findByIdAndUpdate(userId, {
    name,
    email,
    address,
    picture: url
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
  let animalsToDelete = [];
  const delUser = req.user.id;
  User.findByIdAndDelete(delUser)
    .then(deletedUser => {
      return Animal.deleteMany({ user: delUser });
    })
    .then(deletedAnimals => {
      req.logout();
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
