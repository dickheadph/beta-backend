const express = require('express');
const cors = require('cors');
//const AppErr = require('./Middlewares/AppError');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173/',
      'https://beta-ochre.vercel.app',
      'https://beta-ochre.onrender.com',
    ],
  })
);
// app.use(
//   cors({
//     origin: '*',
//   })
// );

const projectRoute = require('./Routes/projectRoute');
const mailRoute = require('./Routes/mailRoute');
const adminRoute = require('./Routes/adminRoute');

app.use('/projects', projectRoute);
app.use('/send-mail', mailRoute);
app.use('/admin', adminRoute);

// app.all('*', (req, res, next) => {
//   return next(new AppErr(`No path found with: ${req.originalUrl}`));
// });

module.exports = app;
