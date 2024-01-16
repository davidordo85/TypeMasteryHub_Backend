'use strict';
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { User } = require('../models');

router.post('/login', async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;
    console.log(usernameOrEmail, password);

    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });

    if (!user || !(await user.comparePassword(password))) {
      const error = new Error('Invalid credentials');
      error.status = 401;
      throw error;
    }

    jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '2h' },
      (err, jwtToken) => {
        if (err) {
          next(err);
          return;
        }
        res.status(200).json({ success: true, token: jwtToken });
      },
    );
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);

    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail || existingUsername) {
      const error = new Error('User already exists');
      error.status = 409;
      throw error;
    }

    const hash = await User.hashPassword(password, 10);

    const newUser = new User({
      username,
      email,
      password: hash,
    });

    await newUser.save();

    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
