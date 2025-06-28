const { Schema, model } = require('mongoose');

const uploadSchema = new Schema({
  filename: String,
  data: Array,
  uploadedAt: Date
});

module.exports = model('Upload', uploadSchema);
