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
      unique: true,
      trim: true
    },
    address: {
      type: String,
      trim: true
    },
    picture: {
      type: String,
      default: 'https://ya-webdesign.com/images/avatar-png-1.png'
    },
    validation: {
      type: Boolean,
      default: false
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
