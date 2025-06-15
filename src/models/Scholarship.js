const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function(v) {
        return v >= 0;
      },
      message: props => `${props.value} is not a valid amount!`
    }
  },
  eligibilityCriteria: {
    type: String,
    maxlength: 255,
    trim: true
  },
  campus: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campus',
    required: true
  },
  description: {
    type: String,
    maxlength: 255,
    trim: true
  },
  // Thêm các trường bổ sung
  type: {
    type: String,
    enum: ['ACADEMIC', 'MERIT', 'NEED_BASED', 'SPORTS', 'OTHER'],
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'CLOSED', 'PENDING'],
    default: 'ACTIVE'
  },
  maintenanceCriteria: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['FIRST_COME', 'MERIT_BASED'],
    required: true
  },
  benefits: [{
    type: String,
    required: true
  }],
  requirements: [{
    type: String,
    required: true
  }],
  applicationProcess: {
    type: String,
    trim: true
  },
  contact: {
    name: String,
    email: {
      type: String,
      validate: {
        validator: function(v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
      }
    },
    phone: String
  },
  applicableCampuses: [{
    type: String,
    enum: ['HANOI', 'HCMC', 'DANANG', 'CANTHO', 'QNHON']
  }],
  percentageDiscount: {
    type: Number,
    min: 0,
    max: 100
  },
  duration: {
    type: String
  }
}, {
  timestamps: true
});


const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

module.exports = Scholarship;

