'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
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
        'Siamês',
        'Rafeiro',
        'Undefined'
      ],
      default: 'Undefined'
    },
    animalAge: {
      type: String,
      enum: ['lessThenOne', 'betweenOneandFive', 'moreThenFive', 'Undefined'],
      default: 'Undefined'
    },
    animalGender: {
      type: String,
      enum: ['male', 'female', 'Undefined'],
      default: 'Undefined'
    },
    animalSize: {
      type: String,
      enum: ['small', 'medium', 'large', 'x-large', 'Undefined'],
      default: 'Undefined'
    },
    animalVaccination: {
      type: String,
      emun: ['yes', 'no', 'Undefined'],
      default: 'Undefined'
    },
    animalCastration: {
      type: String,
      enum: ['yes', 'no', 'Undefined'],
      default: 'Undefined'
    },
    photos: [
      {
        type: String
      }
    ],
    animalDescription: {
      type: String,
      default: null
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamp: {
      createdAt: Date.now
    }
  }
);

module.exports = mongoose.model('Animal', schema);
