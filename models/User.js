'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.path('email').validate(function (value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}, 'Invalid email format');

const validatePassword = password => {
  if (password.length < 8) {
    throw new Error('Password should be at least 8 characters long');
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
