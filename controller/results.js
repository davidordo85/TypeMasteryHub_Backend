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
 * GET /api/v1/results/topic/:topic_name
 */

router.get('/topic/:topic_name', jwtToken, async (req, res) => {
  try {
    const userId = req.apiAuthUserId;
    const topic_name = req.params.topic_name;

    const results = await Results.findOne({
      id_user: userId,
      'resultTest.topic_name': topic_name,
    });

    if (!results) {
      return res.status(404).json({
        success: false,
        message: 'No results found for the specified topic name',
      });
    }
    const specificResult = results.resultTest.find(
      test => test.topic_name === topic_name,
    );
    res.status(200).json({ success: true, resultsTest: specificResult });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/v1/results/test/:test_name
 */

router.get('/test/:test_name', jwtToken, async (req, res) => {
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
  const { topic_name, test_name, stars, ppm, time_test, errorCount } = req.body;

  try {
    if (
      !topic_name ||
      !test_name ||
      !stars ||
      !ppm ||
      !time_test ||
      errorCount === undefined ||
      errorCount === null
    ) {
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
        results.test_completed += 1;
        results.total_stars_earned += parseInt(stars);
        results.resultTest.push({
          topic_name: topic_name,
          test_name: test_name,
          result: result,
        });
      } else {
        const isDuplicate = testResult.result.some(
          result =>
            result.stars === parseInt(stars) &&
            result.ppm === parseInt(ppm) &&
            result.time_test === parseInt(time_test) &&
            result.errorCount === parseInt(errorCount),
        );
        if (!isDuplicate) {
          const existingMaxStars = testResult.result.reduce(
            (max, result) => Math.max(max, result.stars),
            0,
          );
          const starsDifference = Math.max(stars - existingMaxStars, 0);

          if (starsDifference > 0) {
            results.total_stars_earned += starsDifference;
          }
          testResult.result.push(result);
        } else {
          return res.status(400).json({
            success: false,
            message: 'Duplicate results are not allowed.',
          });
        }
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
