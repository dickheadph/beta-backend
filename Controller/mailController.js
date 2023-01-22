const AppErr = require('../Middlewares/AppError');
const AsyncHandler = require('../Middlewares/AsyncHandler');
const sendEmail = require('../Utility/Mailer');

exports.sendDevMail = AsyncHandler(async (req, res, next) => {
  const { name, from, subject, body } = req.body;
  //const message = 'Thank you for reaching out. Will get back to you';
  try {
    const mail = await sendEmail({
      name,
      from,
      subject,
      body,
    });

    console.log(mail);

    res.status(200).json({
      status: 'success',
      message: 'Mail sent succesfully.',
    });
  } catch (error) {
    return next(
      new AppErr('Something went wrong. Email not sent. Please try again.', 404)
    );
  }
});
