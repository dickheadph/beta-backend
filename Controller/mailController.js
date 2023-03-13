const AppErr = require('../Middlewares/AppError');
const AsyncHandler = require('../Middlewares/AsyncHandler');
const sendEmail = require('../Utility/Mailer');

exports.sendDevMail = AsyncHandler(async (req, res, next) => {
  const { name, to, subject } = req.body;
  const uname = name.split(' ')[0];
  const newsubject = subject.toLowerCase();
  const message = `<h2>Hello, ${uname}.</h2>
  <p>Thank you for reaching out.</p>
  <p>It is an honor for me to have a conversation with you about ${newsubject}. Please bear with me for a moment as I have few things to tend to but no worries. I'll get back to you ASAP.</p>
  
  <p>Please reach me out aat my personal mail account at <${process.env.ADMIN_MAIL}></p>
  <p>Regards...</p>
  <p>Shan Carl Parce Belgica.</p>
  <p>MERN Stack Developer</p>
  `;
  //console.log(req.body);
  try {
    await sendEmail({
      to,
      from: process.env.EMAIL_USER,
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
