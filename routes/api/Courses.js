'use strict';

var express = require('express');
var router = express.Router();

const TypeMasterHubCourse = require('../../models/TypeMasterHubCourse');

/**
 * GET /api/v1/course
 */
router.get('/', async function (req, res, next) {
  try {
    const result = await TypeMasterHubCourse.find();

    const dataToSend = result.map(course => ({
      courseName: course.name,
      topics: course.topics.map(topic => ({
        name: topic.name,
        order: topic.order,
      })),
    }));

    res.status(200).json({ success: true, result: dataToSend });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/v1/course/:name
 */

router.get('/:name', async function (req, res, next) {
  try {
    const course = await TypeMasterHubCourse.findOne({
      'topics.name': req.params.name,
    });

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: 'Topic not found' });
    }

    const topic = course.topics.find(topic => topic.name === req.params.name);

    const result = {
      topicName: topic.name,
      tests: topic.tests.map(test => ({
        title: test.title,
        order: test.order,
      })),
    };

    res.status(200).json({ success: true, result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
