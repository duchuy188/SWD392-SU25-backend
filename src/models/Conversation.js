const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  query: {
    type: String,
    required: true
  },
  response: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  }
});

const conversationSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: Date,
  interactions: [interactionSchema],
  context: {
    type: Object,
    default: {}
  },
  userPreferences: {
    type: Object,
    default: {}
  },
  lastTopic: {
    type: String
  }
}, {
  timestamps: true
});

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;
