const mongoose = require('mongoose');

const campusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true
  },
  location: {
    type: String,
    enum: ['HANOI', 'HCMC', 'DANANG', 'CANTHO', 'QNHON'],
    required: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    maxlength: 20,
    trim: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  fanpage: {
    type: String,
    maxlength: 200,
    trim: true
  },
  departments: [String],
  scholarships: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scholarship'
  }],
  tuitionDiscount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  exchangePrograms: [{
    country: String,
    universities: [String]
  }]
}, {
  timestamps: true
});

const Campus = mongoose.model('Campus', campusSchema);
module.exports = Campus;