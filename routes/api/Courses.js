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
    res.status(200).json({ success: true, result: result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
