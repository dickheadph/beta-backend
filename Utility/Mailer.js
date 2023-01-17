const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //create transport
  const transporter = nodemailer.createTransport({
    host: '',
    port: '',
    auth: {
      username: '',
      password: '',
    },
  });
  //mail options
  const { from, subject, body } = options;
  const mailOptions = {
    from,
    to: `Shan Belgica ${process.env.ADMIN_MAIL}`,
    subject,
    body,
  };
  //send mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
