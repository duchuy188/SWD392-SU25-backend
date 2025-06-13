const mongoose = require('mongoose');

const admissionMethodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  criteria: [{
    type: String,
    required: true
  }],
  requirements: [{
    type: String,
    required: true
  }],
  year: {
    type: Number,
    required: true
  }
});

const AdmissionMethod = mongoose.model('AdmissionMethod', admissionMethodSchema);
module.exports = AdmissionMethod;
