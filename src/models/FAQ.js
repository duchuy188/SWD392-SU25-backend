const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['ACADEMIC', 'CAREER', 'ADMISSION', 'GENERAL', 'FPT_SPECIFIC']
  },
  keywords: [String],
  relatedQuestions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FAQ'
  }]
});

const FAQ = mongoose.model('FAQ', faqSchema);
module.exports = FAQ;
