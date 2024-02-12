'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  resultsTest: [
    {
      id_test: { type: String },
      result: [
        {
          stars: { type: Number },
          ppm: { type: Number },
          time_test: { type: Number },
          errorCount: { type: Number },
          date: { type: Date },
        },
      ],
    },
  ],
});

userSchema.path('email').validate(function (value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}, 'Invalid email format');

const validatePassword = password => {
  if (password.length < 8) {
    throw new Error('Password should be at least 8 characters long');
  }

  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const numberRegex = /[0-9]/;

  if (
    !uppercaseRegex.test(password) ||
    !lowercaseRegex.test(password) ||
    !numberRegex.test(password)
  ) {
    throw new Error(
      'Password should contain at least one uppercase letter, one lowercase letter, and one number',
    );
  }
};

userSchema.statics.hashPassword = async function (password) {
  validatePassword(password);

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

userSchema.methods.comparePassword = function (passwordClear) {
  return bcrypt.compare(passwordClear, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
