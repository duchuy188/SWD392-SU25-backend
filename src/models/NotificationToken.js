const mongoose = require('mongoose');

const notificationTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true
  },
  deviceType: {
    type: String,
    enum: ['android', 'ios', 'web'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 24 * 60 * 60 
  }
});

notificationTokenSchema.index({ token: 1 }, { unique: true });

const NotificationToken = mongoose.model('NotificationToken', notificationTokenSchema);
module.exports = NotificationToken;