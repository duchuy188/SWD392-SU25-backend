const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
  type: String,
  description: String,
  recommendedMajors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Major'
  }],
  recommendedFPTMajors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Major'
  }]
});

const testSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true
  },
  type: {
    type: String,
    enum: ['PERSONALITY', 'CAREER', 'ACADEMIC'],
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  questions: [{
    question: String,
    options: [String],
    weight: Number,
    category: String
  }],
  results: [testResultSchema]
}, {
  timestamps: true
});

const Test = mongoose.model('Test', testSchema);
module.exports = Test;
