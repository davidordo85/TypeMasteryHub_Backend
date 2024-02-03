'use strict';
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtToken = require('../bin/jwtAuth');

const { User } = require('../models');

router.post('/login', async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;

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

router.post('/addResults', jwtToken, async (req, res, next) => {
  const userId = req.apiAuthUserId;
  const { id_topic, id_test, stars, ppm } = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'User does not exist.' });
    }

    user.resultsTest.push({
      id_topic,
      id_test,
      stars,
      ppm,
    });

    console.log('user log', user);

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: 'Results successfully added.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
