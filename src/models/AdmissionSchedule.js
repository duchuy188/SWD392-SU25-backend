const mongoose = require('mongoose');

const admissionScheduleSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  rounds: [{
    name: String,
    startDate: Date,
    endDate: Date,
    resultDate: Date,
    description: String
  }],
  importantDates: [{
    name: String,
    date: Date,
    description: String
  }]
});

const AdmissionSchedule = mongoose.model('AdmissionSchedule', admissionScheduleSchema);
module.exports = AdmissionSchedule;
