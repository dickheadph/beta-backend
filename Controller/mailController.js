const AppErr = require('../Middlewares/AppError');
const AsyncHandler = require('../Middlewares/AsyncHandler');
const sendEmail = require('../Utility/Mailer');

exports.sendDevMail = AsyncHandler(async (req, res, next) => {
  const { name, to, from, subject } = req.body;
  let uname = name.split(' ')[0];
  const message = `<h2>Hello, ${uname}.</h2>
  <p>Thank you for reaching out.</p>
  <p>It is an honor for me to have a connversation with you. Please bear with me for a moment as I have few thing to take care of but no worries. I'lle get back to you ASAP.</p>
  <p>Have a great daya ahead!.</p>
  `;
  //console.log(req.body);
  try {
    await sendEmail({
      to,
      from,
      subject,
      message,
    });
  } catch (error) {
    return next(
      new AppErr('Something went wrong. Email not sent. Please try again.', 500)
    );
  }
  res.status(200).json({
    status: 'success',
    message: 'Mail sent succesfully.',
  });
});
