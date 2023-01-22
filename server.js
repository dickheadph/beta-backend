//const app = require('./app');
const mongoose = require('mongoose');

const env = require('dotenv');

env.config({ path: './.env' });
//const port = process.env.PORT || 8080;
//const db = process.env.MONGO_URI;
//console.log(db);
mongoose.set('strictQuery', true);
await mongoose
  .connect(
    'mongodb+srv://shana:typhoon150@cluster0.w4we942.mongodb.net/Portfolio?retryWrites=true&w=majority'
  )
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
