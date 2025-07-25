const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  filename: String,
  data: Array,
  uploadedAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Add user reference
});

module.exports = mongoose.model('Upload', uploadSchema);