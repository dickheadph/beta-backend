const express = require('express');
const AppErr = require('./Middlewares/AppError');
const app = express();

const projectRoute = require('./Routes/projectRoute');
const mailRoute = require('./Routes/mailRoute');
const adminRoute = require('./Routes/adminRoute');

app.use(express.json());
app.use('/portfolio/api/projects', projectRoute);
app.use('/portfolio/api/mail-dev', mailRoute);
app.use('/portfolio/api/admin', adminRoute);

app.all('*', (req, res, next) => {
  return next(new AppErr(`No path found with: ${req.originalUrl}`));
});

module.exports = app;
