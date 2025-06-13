const mongoose = require('mongoose');

const englishProgramSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  partneredCountries: [{
    country: String,
    universities: [String]
  }],
  requirements: {
    type: String
  },
  benefits: [{
    type: String
  }]
});

const EnglishProgram = mongoose.model('EnglishProgram', englishProgramSchema);
module.exports = EnglishProgram;
