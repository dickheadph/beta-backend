const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //create transport
  const transporter = nodemailer.createTransport({
    // host: '',
    // port: '',
    service: 'SendGrid',
    auth: {
      user: process.env.HOST_USERNAME,
      pass: process.env.HOST_USERNAME,
    },
  });
  //mail options
  const { name, from, subject, body } = options;
  const mailOptions = {
    name,
    from,
    to: `Shan Belgica <${process.env.ADMIN_MAIL}>`,
    subject,
    body,
  };
  //send mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
