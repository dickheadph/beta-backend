const multer = require('multer');
const AppError = require('../Middlewares/AppError');
//const AsyncHandler = require('../Middlewares/AsyncHandler');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/Upload');
  },
  fileName: (req, file, cb) => {
    cb(null, 'Project - ' + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image. Please select an image.', 403));
  }
};
const upload = multer({
  storage,
  fileFilter,
});

const uploadCover = upload.single('projectImage');
module.exports = uploadCover;
