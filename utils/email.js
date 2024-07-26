const nodemailer = require('nodemailer');

// Activate in gmail less secure app option
const sendEmail = (options) => {
  // 1. create a transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};
