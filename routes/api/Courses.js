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

    // Mapear para obtener solo los nombres de los temas
    const topicNames = result.map(course =>
      course.topics.map(topic => ({ name: topic.name })),
    );

    res.status(200).json({ success: true, result: topicNames.flat() });
  } catch (error) {
    next(error);
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
        .json({ success: false, message: 'Tema no encontrado' });
    }

    const topic = course.topics.find(topic => topic.name === req.params.name);

    res.status(200).json({ success: true, result: topic });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
