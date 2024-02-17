'use strict';
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwtToken = require('../bin/jwtAuth');

const { User, Results } = require('../models');

router.post('/login', async (req, res, next) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
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
      return res.status(409).json({
        success: false,
        message: 'User already exists',
      });
    }

    const hash = await User.hashPassword(password, 10);

    const newUser = new User({
      username,
      email,
      password: hash,
    });

    await newUser.save();

    const newResults = new Results({
      id_user: newUser._id,
      resultTest: [],
      test_completed: 0,
      total_stars_earned: 0,
    });

    await newResults.save();

    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
