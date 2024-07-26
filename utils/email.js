const nodemailer = require('nodemailer');

// Activate in gmail less secure app option
const sendEmail = async (options) => {
  // 1. create a transporter
  const transporter = nodemailer.createTransport({
    // service: 'Gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // define the email options
  const mailOptions = {
    from: 'Md. Sayem Abedin <sayemabedin.bd@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // send the mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
