const AppErr = require('../Middlewares/AppError');
const AsyncHandler = require('../Middlewares/AsyncHandler');
const sendEmail = require('../Utility/Mailer');

exports.sendDevMail = AsyncHandler(async (req, res, next) => {
  const { name, to, subject } = req.body;
  //const uname = name.split(' ')[0];
  //const newsubject = subject.toLowerCase();
  const message = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Personal Transaction</title>
  </head>
  <body style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; background-color: #f2f2f2;">
  
    <!-- Header -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
      <tr>
        <td align="center">
          <img style="width: 100%, border-radius: 5px" src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTd8fGVudGVycHJpc2UlMjBidWlsZGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="Logo" style="display: block; margin: 0 auto;">
        </td>
      </tr>
    </table>
    <br>
  
    <!-- Content -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse; background-color: #fff; padding: 20px;">
      <tr>
        <td>
          <h1>Personal Transaction Confirmation</h1>
          <p>Dear ${name},</p>
          <p>I hope this email finds you well. I am writing to confirm that I have received your mail about ${subject}.</p>
          <p>Please bear with me for a moment. I will get back to you as ASAP. Please know that I am looking froward to have a coversation with you.</p>
          <p>You can reach me out through my personal mail at <${process.env.ADMIN_MAIL}></p>
          <p>Thank you for your consideration.</p>
          <p>Best regards,</p>
          <p>Shan Carl Parce Belgica</p>
        </td>
      </tr>
    </table>
  
    <!-- Footer -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-collapse: collapse;">
      <tr>
        <td align="center" style="padding: 20px;">
          <p style="color: #999;">This email was sent from business mail. <${process.env.EMAIL_USER}>. Please do not reply to this message.</p>
        </td>
      </tr>
    </table>
  
  </body>
  </html>
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
