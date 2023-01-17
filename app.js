const express = require('express');
const app = express();
const AppErr = require('./Middlewares/AppError');

const projectRoute = require('./Routes/projectRoute');
const mailRoute = require('./Routes/mailRoute');
const adminRoute = require('./Routes/adminRoute');

app.use(express.json());

app.use('/project/shan/api/projects', projectRoute);
app.use('/project/shan/api/mail-dev', mailRoute);
app.use('/project/shan/api/admin', adminRoute);

app.all('*', (req, res, next) => {
  return next(new AppErr(`No path found with: ${req.originalUrl}`));
});

module.exports = app;
