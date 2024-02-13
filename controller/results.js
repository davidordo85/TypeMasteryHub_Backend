'use strict';
const express = require('express');
const router = express.Router();
const jwtToken = require('../bin/jwtAuth');

const { Results } = require('../models');

/**
 * GET /api/v1/results
 */

router.get('/', jwtToken, async (req, res, next) => {
  try {
    const userId = req.apiAuthUserId;
    const results = await Results.findOne({ id_user: userId });

    if (!results) {
      return res.status(401).json({
        success: false,
        message: 'No results found',
      });
    }

    res.status(200).json({ success: true, result: results });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/v1/results/:test_name
 */

router.get('/:test_name', jwtToken, async (req, res, next) => {
  try {
    const userId = req.apiAuthUserId;
    const test_name = req.params.test_name;

    const results = await Results.findOne({
      id_user: userId,
      'resultTest.test_name': test_name,
    });

    if (!results) {
      return res.status(404).json({
        success: false,
        message: 'No results found for the specified test name',
      });
    }

    const specificResult = results.resultTest.find(
      test => test.test_name === test_name,
    );

    res.status(200).json({ success: true, result: specificResult });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
