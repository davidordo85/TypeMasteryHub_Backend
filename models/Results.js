'use strict';

const mongoose = require('mongoose');

const resultsSchema = mongoose.Schema({
  id_user: { type: String, unique: true },
  resultTest: [
    {
      topic_name: { type: String },
      test_name: { type: String, unique: true },
      result: [
        {
          stars: { type: Number },
          ppm: { type: Number },
          time_test: { type: Number },
          errorCount: { type: Number },
          date: { type: Date },
        },
      ],
    },
  ],
  test_completed: { type: Number },
  total_stars_earned: { type: Number },
});

const Results = mongoose.model('Results', resultsSchema);

module.exports = Results;
