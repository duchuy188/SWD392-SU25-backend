const mongoose = require('mongoose');

const studyNowPayLaterSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  totalSlots: {
    type: Number,
    required: true
  },
  percentages: [{
    type: Number,
    required: true
  }],
  criteria: [{
    type: String,
    required: true
  }],
  repaymentTerms: {
    type: String,
    required: true
  }
});

const StudyNowPayLater = mongoose.model('StudyNowPayLater', studyNowPayLaterSchema);
module.exports = StudyNowPayLater;
