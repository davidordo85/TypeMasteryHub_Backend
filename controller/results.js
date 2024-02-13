'use strict';
const express = require('express');
const router = express.Router();
const jwtToken = require('../bin/jwtAuth');

const { Results } = require('../models');

/**
 * GET /api/v1/results
 */

router.get('/', jwtToken, async (req, res) => {
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

router.get('/:test_name', jwtToken, async (req, res) => {
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

    res.status(200).json({ success: true, resultsTest: specificResult });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * PUT /api/v1/results/
 */

router.put('/', jwtToken, async (req, res) => {
  const userId = req.apiAuthUserId;
  const { test_name, stars, ppm, time_test, errorCount } = req.body;
  try {
    if (!test_name || !stars || !ppm || !time_test || !errorCount) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields.',
      });
    }

    const results = await Results.findOne({
      id_user: userId,
    });

    const testResult = results.resultTest.find(
      result => result.test_name === test_name,
    );
    const result = {
      stars: stars,
      ppm: ppm,
      time_test: time_test,
      errorCount: errorCount,
      date: new Date(),
    };

    if (results) {
      if (!testResult) {
        results.resultTest.push({ test_name: test_name, result: result });
      } else {
        testResult.result.push(result);
      }
      await results.save();
      res.status(200).json({
        success: true,
        message: 'Results updated successfully',
      });
    } else {
      res.status(404).json({ success: false, message: 'Not found results' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
