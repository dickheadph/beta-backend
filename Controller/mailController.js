const AppErr = require('../Middlewares/AppError');
const AsyncHandler = require('../Middlewares/AsyncHandler');
const sendEmail = require('../Utility/Mailer');

exports.sendDevMail = AsyncHandler(async (req, res, next) => {
  const { to, from, subject, message } = req.body;
  //const message = 'Thank you for reaching out. Will get back to you';
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
  // if (mail) {
  //   return next(
  //     new AppErr('Something went wrong. Email not sent. Please try again.', 500)
  //   );
  // }
  res.status(200).json({
    status: 'success',
    message: 'Mail sent succesfully.',
  });
});
