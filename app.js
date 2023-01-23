const express = require('express');
const cors = require('cors');
//const AppErr = require('./Middlewares/AppError');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://beta-ochre.vercel.app/'],
  })
);

const projectRoute = require('./Routes/projectRoute');
const mailRoute = require('./Routes/mailRoute');
const adminRoute = require('./Routes/adminRoute');

app.use('.onrender.com/projects', projectRoute);
app.use('.onrender.com/send-mail', mailRoute);
app.use('.onrender.com/admin', adminRoute);

// app.all('*', (req, res, next) => {
//   return next(new AppErr(`No path found with: ${req.originalUrl}`));
// });

module.exports = app;
