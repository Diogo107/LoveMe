const nodemailer = require('nodemailer');

const EMAIL = 'pick.me.today.adoption@gmail.com';
const PASSWORD = 'adoption123';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL,
    pass: PASSWORD
  }
});

module.exports = nodemailer;
