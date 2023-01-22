//const app = require('./app');
const mongoose = require('mongoose');

const env = require('dotenv');
env.config({ path: './.env' });

//const port = process.env.PORT || 8080;
const db = process.env.MONGO_URI;
mongoose.set('strictQuery', true);
mongoose
  .connect(db)
  .then(() => {
    console.log('Connected to MongoDB_ATLAS');
  })
  .catch((err) => {
    console.log(err);
  });

// app.listen(port, () => {
//   console.log(`Server Up and running on port ${port}`);
// });

process.on('unhandledRejection', (err) => {
  console.log(`Error name:  ${err.name}. Error message: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
