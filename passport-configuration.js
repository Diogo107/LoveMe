'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');
const bcryptjs = require('bcryptjs');
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

passport.serializeUser((user, callback) => {
  callback(null, user._id);
});

passport.deserializeUser((id, callback) => {
  User.findById(id)
    .then(user => {
      callback(null, user);
    })
    .catch(error => {
      callback(error);
    });
});

passport.use(
  'local-sign-up',
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true
    },
    (req, email, password, callback) => {
      const name = req.body.name;
      const address = req.body.address;
      let userEmail;
      let thisIsTheUser;
      console.log('im here! Im about to run decript');
      bcryptjs
        .hash(password, 10)
        .then(hash => {
          console.log('im here! this is the hash', hash);
          return User.create({
            name,
            email,
            address,
            passwordHash: hash
          });
        })
        .then(user => {
          console.log('This is the user passport', user);
          thisIsTheUser = user;
          return transporter
            .sendMail({
              from: `Jan20 Test <${user.email}>`,
              to: `${user.email}`,
              //to: 'diogo.filipe.santos107@gmail.com',
              subject: 'Email Confirmation',
              // text: 'Hello world!'
              html: `Click the link to confirm your Email. ${process.env.WORKING_URL}/confirm-email/${user._id}`
            })
            .then(mail => {
              console.log(mail);
              console.log('Sent the email', thisIsTheUser);
              callback(null, user);
            });
        })

        .catch(error => {
          callback(error);
        });
    }
  )
);

passport.use(
  'local-sign-in',
  new LocalStrategy({ usernameField: 'email' }, (email, password, callback) => {
    let user;
    User.findOne({
      email
    })
      .then(document => {
        user = document;
        return bcryptjs.compare(password, user.passwordHash);
      })
      .then(passwordMatchesHash => {
        if (passwordMatchesHash) {
          callback(null, user);
        } else {
          callback(new Error('WRONG_PASSWORD'));
        }
      })
      .catch(error => {
        callback(error, req.logout());
      });
  })
);
