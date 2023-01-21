const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A admin must have name.'],
    },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'A admin must have an email.'],
    },
    password: {
      type: String,
      required: [true, 'A admin must have a password'],
      minlength: 8,
    },
    passwordConfirm: {
      type: String,
      validator: {
        validate: function (pass) {
          return pass === this.password;
        },
      },
      message: 'Password did not match.',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

adminSchema.methods.comparePasswords = async function (
  stringedPass,
  hashedPass
) {
  return await bcrypt.compare(stringedPass, hashedPass);
};

adminSchema.methods.createJWToken = async function (adminId) {
  return await jwt.sign({ adminId }, process.env.SECRET_KEY, {
    expiresIn: process.env.VALID_TILL,
  });
};

const ADMIN = mongoose.model('ADMIN', adminSchema);

module.exports = ADMIN;
