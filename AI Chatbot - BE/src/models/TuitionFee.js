const mongoose = require('mongoose');

const tuitionFeeSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  baseAmount: {
    type: Number,
    required: true
  },
  increaseRate: {
    type: Number,
    default: 0
  },
  majorSpecificFees: [{
    major: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Major'
    },
    amount: Number
  }],
  additionalFees: [{
    name: String,
    amount: Number,
    description: String
  }],
  paymentMethods: [{
    name: String,
    description: String
  }]
});

const TuitionFee = mongoose.model('TuitionFee', tuitionFeeSchema);
module.exports = TuitionFee;
