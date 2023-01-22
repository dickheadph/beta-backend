const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //create transport
  const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    // host: 'smtp.sendgrid.net',
    // port: 465,
    auth: {
      user: process.env.HOST_USERNAME,
      pass: process.env.HOST_PASSWORD,
    },
  });
  //mail options
  const { name, to, subject, body } = options;
  const mailOptions = {
    name,
    to,
    from: `Shan Belgica <${process.env.ADMIN_MAIL}>`,
    subject,
    body,
  };
  //send mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
