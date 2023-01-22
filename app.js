const express = require('express');
const AppErr = require('./Middlewares/AppError');
const app = express();
app.use(express.json());

const projectRoute = require('./Routes/projectRoute');
const mailRoute = require('./Routes/mailRoute');
const adminRoute = require('./Routes/adminRoute');

app.use('/portfolio/api/projects', projectRoute);
app.use('/portfolio/api/send-mail', mailRoute);
app.use('/portfolio/api/admin', adminRoute);

app.all('*', (req, res, next) => {
  return next(new AppErr(`No path found with: ${req.originalUrl}`));
});

module.exports = app;
