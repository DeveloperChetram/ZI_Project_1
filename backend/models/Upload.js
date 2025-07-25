const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  filename: String,
  data: Array,
  uploadedAt: Date
});

module.exports = mongoose.model('Upload', uploadSchema);
