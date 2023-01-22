//const app = require('./app');
const mongoose = require('mongoose');

require('dotenv').config({ path: './.env' });
const db = process.env.MONGODB_URI;

//const port = process.env.PORT || 8080;
mongoose.set('strictQuery', true);
//console.log(db);
const connectDB = async () => {
  await mongoose
    .connect(db)
    .then(() => {
      console.log('Connected to MongoDB_ATLAS');
    })
    .catch((err) => {
      console.log(err);
    });
};

connectDB();
// app.listen(port, () => {
//   console.log(`Server Up and running on port ${port}`);
// });

// process.on('unhandledRejection', (err) => {
//   console.log(`Error name:  ${err.name}. Error message: ${err.message}`);
//   server.close(() => {
//     process.exit(1);
//   });
// });
