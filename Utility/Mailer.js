const nodemailer = require('nodemailer');
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendEmail = async (options) => {
  //create transport
  const transpoter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    //service: 'SendGrid',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  //mail options
  const { to, from, subject, message } = options;
  const mailOption = {
    to,
    from,
    subject,
    message,
  };
  //send mail

  console.log(mailOption);
  transpoter.sendMail(mailOption);
};

module.exports = sendEmail;
