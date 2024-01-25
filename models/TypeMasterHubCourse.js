'use strict';

const mongoose = require('mongoose');

const testSchema = mongoose.Schema({
  title: String,
  order: Number,
  text_test: String,
});

const levelSchema = mongoose.Schema({
  max_time: Number,
  stars: Number,
});

const performanceSchema = mongoose.Schema({
  max_time: Number,
  levels: {
    copper: levelSchema,
    silver: levelSchema,
    gold: levelSchema,
  },
});

const topicSchema = mongoose.Schema({
  name: String,
  order: Number,
  performance: performanceSchema,
  tests: [testSchema],
});

const masterHubCourseSchema = mongoose.Schema({
  name: String,
  topics: [topicSchema],
});

const TypeMasterHubCourse = mongoose.model(
  'MasterHubCourse',
  masterHubCourseSchema,
);

module.exports = TypeMasterHubCourse;
