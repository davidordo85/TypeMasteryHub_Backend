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

    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
});

//TODO: necesito cambiar la forma de almacenar estos datos

router.post('/addResult', jwtToken, async (req, res, next) => {
  const userId = req.apiAuthUserId;
  const { id_test, stars, ppm, time_test, errorCount } = req.body;

  try {
    if (!id_test || !stars || !ppm || !time_test || !errorCount) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields.',
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User does not exist.',
      });
    }

    let isNewResult = true;

    // Buscar si ya existe un resultado con el mismo id_test
    const existingResult = user.resultsTest.find(
      result => result.id_test === id_test,
    );

    if (existingResult) {
      for (const result of existingResult.result) {
        console.log('Comparing:', result, {
          stars,
          ppm,
          time_test,
          errorCount,
        });
        if (
          result.stars === parseInt(stars) &&
          result.ppm === parseInt(ppm) &&
          result.time_test === parseInt(time_test) &&
          result.errorCount === parseInt(errorCount)
        ) {
          isNewResult = false;
          break;
        }
      }
    }

    if (isNewResult) {
      const currentDate = new Date();
      const newResult = {
        stars,
        ppm,
        time_test,
        errorCount,
        date: currentDate,
      };

      if (existingResult) {
        existingResult.result.push(newResult);
      } else {
        user.resultsTest.push({
          id_test,
          result: [newResult],
        });
      }

      await user.save();

      return res.status(200).json({
        success: true,
        message: 'Results successfully added.',
      });
    } else {
      return res.status(409).json({
        success: false,
        message: 'Result with same data already exists.',
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
