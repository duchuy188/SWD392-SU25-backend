const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  role: {
    type: String,
    required: true,
    maxlength: 50
  }
}, {
  timestamps: true 
});



const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;