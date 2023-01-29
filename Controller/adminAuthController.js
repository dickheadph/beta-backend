const AppErr = require('../Middlewares/AppError');
const AsyncHandler = require('../Middlewares/AsyncHandler');
const ADMIN = require('../Schema/adminSchema');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const signupAdmin = AsyncHandler(async (req, res, next) => {
  const { name, email, password, passwordConfirm, role } = req.body;
  const admin = await ADMIN.create({
    name,
    email,
    password,
    passwordConfirm,
    role,
  });

  if (!admin) {
    return next(new AppErr('Failed to create admin acc.'));
  }

  const token = await admin.createJWToken(admin._id);
  //console.log(token);

  res.status(200).json({
    status: 'success',
    token,
    data: admin,
  });
});

const loginAdmin = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    return next(new AppErr('Please use a valid email & password', 403));
  }

  const admin = await ADMIN.findOne({ email }).select('+password');
  const match = await admin.comparePasswords(password, admin.password);

  if (!match) {
    return next(
      new AppErr(
        'Invalid Admin credentials. Please use correct email & password.',
        403
      )
    );
  }
  const token = await admin.createJWToken(admin._id);
  res.status(200).json({
    status: 'success',
    token,
    data: {
      admin,
    },
  });
});

const logoutAdmin = AsyncHandler(async (req, res, next) => {
  res.cookie('jwt', '', {
    expiresIn: Date(0),
    secure: false,
    httpOnly: true,
  });
});

const protectRoute = AsyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;
  let token = {};
  if (header && header.startsWith('Bearer')) {
    token = header.split(' ')[1];
  }

  //console.log(token);
  if (!token) {
    return next(new AppErr('You are not allowed to access this route.', 403));
  }

  const credentials = await promisify(jwt.verify)(
    token,
    process.env.SECRET_KEY
  );
  const admin = await ADMIN.findById(credentials.id);

  req.admin = admin;
  next();
});
module.exports = {
  signupAdmin,
  loginAdmin,
  protectRoute,
  logoutAdmin,
};
