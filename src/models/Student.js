const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  grade: {
    type: Number,
    min: 10,
    max: 12
  },
  academicResults: [{
    subject: String,
    score: Number,
    semester: Number
  }],
  interests: [String],
  personalityType: String,
  preferredFPTMajors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Major'
  }]
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;