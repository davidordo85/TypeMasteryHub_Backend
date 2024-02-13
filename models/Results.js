'use strict';

const mongoose = require('mongoose');

const resultsSchema = mongoose.Schema({
  id_user: { type: String, unique: true },
  resultTest: [
    {
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
});

const Results = mongoose.model('Results', resultsSchema);

module.exports = Results;