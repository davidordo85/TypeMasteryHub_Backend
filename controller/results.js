'use strict';
const express = require('express');
const router = express.Router();
const jwtToken = require('../bin/jwtAuth');

const { Results, TypeMasterHubCourse } = require('../models');

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

    let totalMaxStars = 0;

    results.resultTest.forEach(result => {
      result.tests.forEach(test => {
        const maxStars = Math.max(...test.result.map(result => result.stars));
        totalMaxStars += maxStars;
      });
    });

    const testsCounts = results.resultTest.map(result => ({
      topic_name: result.topic_name,
      test_count: result.tests.length,
    }));

    res.status(200).json({
      success: true,
      result: {
        totalTestsCompleted: testsCounts.reduce(
          (total, result) => total + result.test_count,
          0,
        ),
        totalStarsEarned: totalMaxStars,
        result: results,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/v1/results/topics/:topic_name
 */

router.get('/topics/:topic_name', jwtToken, async (req, res) => {
  try {
    const userId = req.apiAuthUserId;
    const topic_name = req.params.topic_name;
    const results = await Results.findOne({ id_user: userId });
    if (!results) {
      return res.status(401).json({
        success: false,
        message: 'No results found',
      });
    }

    const topicResults = results.resultTest.find(
      result => result.topic_name === topic_name,
    );

    const numberTestComplete = topicResults.tests.length;
    let totalMaxStars = 0;

    topicResults.tests.forEach(test => {
      const testResults = test.result;
      const maxStars = testResults.reduce((max, result) => {
        return Math.max(max, result.stars);
      }, 0);
      totalMaxStars += maxStars;
    });

    if (topicResults.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No results found for topic ${topic_name}`,
      });
    }
    return res.status(200).json({
      success: true,
      result: {
        totalTestsCompleted: numberTestComplete,
        starsEarned: totalMaxStars,
        result: results,
      },
    });
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

    const course = await TypeMasterHubCourse.findOne({
      'topics.name': topic_name,
      'topics.tests.title': test_name,
    });

    if (!course) {
      return res.status(400).json({
        success: false,
        message:
          'The topic name or test name does not match any of our course topics or tests.',
      });
    }

    const results = await Results.findOne({
      id_user: userId,
    });

    const topicResult = results.resultTest.find(
      result => result.topic_name === topic_name,
    );

    const result = {
      stars: stars,
      ppm: ppm,
      time_test: time_test,
      errorCount: errorCount,
      date: new Date(),
    };

    if (results) {
      if (!topicResult) {
        results.resultTest.push({
          topic_name: topic_name,
          tests: [
            {
              test_name: test_name,
              result: [result],
            },
          ],
        });
      } else {
        const isDuplicate = topicResult.tests.some(test => {
          if (test.test_name === test_name) {
            return test.result.some(
              result =>
                result.stars === parseInt(stars) &&
                result.ppm === parseInt(ppm) &&
                result.time_test === parseInt(time_test) &&
                result.errorCount === parseInt(errorCount),
            );
          }
        });

        if (!isDuplicate) {
          const testToUpdate = topicResult.tests.find(
            test => test.test_name === test_name,
          );
          if (testToUpdate) {
            testToUpdate.result.push(result);
          } else {
            topicResult.tests.push({ test_name: test_name, result: [result] });
          }
        } else {
          return res.status(400).json({
            success: false,
            message: 'Duplicate results are not allowed.',
          });
        }
      }
    }
    await results.save();
    res.status(200).json({
      success: true,
      message: 'Results updated successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
