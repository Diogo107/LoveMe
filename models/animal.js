'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  specie: {
    type: String,
    enum: ['cat', 'dog'],
    required: true
  },
  breed: {
    type: String,
    enum: [
      'Any',
      'Europeu',
      'Angorá',
      'Azul Russo',
      'B. Noruega',
      'Other breed...',
      'Persa',
      'Siamês'
    ],
    default: 'Undefined'
  },
  age: {
    type: String,
    enum: ['lessThenOne', 'betweenOneandFive', 'moreThenFive'],
    default: 'Undefined'
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'Undefined'
  },
  Size: {
    type: String,
    enum: ['small', 'medium', 'large', 'x-large'],
    default: 'Undefined'
  },
  vacctination: {
    type: String,
    emun: ['yes', 'no'],
    default: 'Undefined'
  },
  castration: {
    type: String,
    enum: ['yes', 'no'],
    default: 'Undefined'
  },
  photos: {
    type: String,
    default: 'https://www.trop-fort.net/wp-content/uploads/2019/06/pets-image-for-all.jpg'
  },
  description: {
    type: String,
    default: null
  } /* ,
  timestamp: {
    createdAt: true
  } */
});

module.exports = mongoose.model('Animal', schema);
