'use strict';

const { Router } = require('express');

const passport = require('passport');

const routeGuard = require('./../middleware/route-guard');

const Animal = require('./../models/animal');

const router = new Router();

router.get('/search-list', (req, res, next) => {
  Animal.find().then(animal => {
    console.log('This is to the cards', { animal });
    res.render('animal/search-list', { animal });
  });
});

router.get('/register-animal', (req, res, next) => {
  res.render('animal/register-animal');
});

router.post('/single-animal', (req, res, next) => {
  console.log('i am adding an animal', req.body);
  //  const age = req.body.animalAge;
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
    animalDescription
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
