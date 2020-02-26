'use strict';

const { Router } = require('express');
const passport = require('passport');
const routeGuard = require('./../middleware/route-guard');
const Animal = require('./../models/animal');
const router = new Router();
const uploader = require('./../middleware/upload-files');
//const nodemailer = require('./../middleware/nodemailer');

router.get('/search-list', (req, res, next) => {
  Animal.find().then(animal => {
    console.log('This is to the cards', { animal });
    res.render('animal/search-list', { animal });
  });
});

router.get('/search-list/:animal', (req, res, next) => {
  const search = req.params.animal;
  console.log(req.params.search);
  Animal.find({ specie: `${search}` }).then(animal => {
    console.log('This is to the cards', { animal });
    res.render('animal/search-list', { animal });
  });
});

const nodemailer = require('nodemailer');

const EMAIL = 'ih174test@gmail.com';
const PASSWORD = 'IH174@lis';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

router.post('/single-animal/:animalId', routeGuard, (req, res, next) => {
  console.log(nodemailer);
  const animalId = req.params.animalId;
  let userEmail;
  const { body } = req;
  Animal.findById(animalId)
    .populate('user')
    .then(animalWithUser => {
      //console.log('this is the animal information', animal.user);
      userEmail = animalWithUser.user.email;
    })
    .then(() => {
      return transporter.sendMail({
        from: `Jan20 Test <${EMAIL}>`,
        to: userEmail,
        subject: 'Someone is asking for your pets',
        // text: 'Hello world!'
        html: `${body.message}`
      });
    })

    .catch(error => next(error));
});

router.post('/search-filter', (req, res, next) => {
  //const { body } = req;
  const body = req.body;
  //understand which filters to apply (the first was Santi method)
  for (let key in body) {
    body[key].length > 0 ? '' : delete body[key];
  }
  /* for (let key in body) {
    if (body[key].length == 0) {
      delete body[key];
    }
  } */
  //
  Animal.find(body).then(animal => {
    //console.log('I got to here', animal);
    res.render('animal/search-list', { animal });
  });
});

router.get('/register-animal', routeGuard, (req, res, next) => {
  res.render('animal/register-animal');
});

router.post('/single-animal', uploader.array('photos', 10), routeGuard, (req, res, next) => {
  console.log('i am adding an animal', req.body);
  console.log(req.session.passport.user);
  const urls = req.files.map(file => {
    return file.url;
  });
  //const userId = req.session.passport.user;
  const {
    name,
    specie,
    breed,
    animalAge,
    animalGender,
    animalSize,
    animalVaccination,
    animalCastration,
    animalDescription
  } = req.body;
  Animal.create({
    name,
    specie,
    breed,
    animalAge,
    animalGender,
    animalSize,
    animalVaccination,
    animalCastration,
    animalDescription,
    photos: urls,
    user: req.session.passport.user
  })
    .then(animal => {
      console.log('This is the single');
      console.log(animal);
      res.redirect(`/animal/single-animal/${animal._id}`);
    })
    .catch(error => {
      next(error);
    });
});

router.get('/single-animal/:animalId', (req, res, next) => {
  console.log('i am here', req.params.animalId);
  const id = req.params.animalId;
  Animal.findById(id)
    .then(animal => {
      console.log(animal);
      console.log('Is this working?');
      res.render('animal/single-animal', { animal });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;

/* specie: 'cat',
  'animal-age': 'lessThenOne',
  'animal-gender': 'male',
  'animal-size': 'small',
  'animal-vaccination': 'yes',
  'animal-castration': 'yes',
  'animal-description': 'asfaga'
 */
