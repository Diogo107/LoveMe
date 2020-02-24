'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    picture: {
      type: String,
      default: 'https://cdn3.iconfinder.com/data/icons/shipping-and-delivery-2-1/512/54-512.png'
    },
    passwordHash: {
      type: String,
      required: true
    } /* ,
  timestamp: {
    createdAt: true
  } */
  },
  {
    timestamp: {
      createdAt: Date.now
    }
  }
);

module.exports = mongoose.model('User', schema);
