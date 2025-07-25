<<<<<<< HEAD
const { Schema, model } = require('mongoose');

const uploadSchema = new Schema({
  filename: String,
  data: Array,
  uploadedAt: Date
});

module.exports = model('Upload', uploadSchema);
=======
const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  filename: String,
  data: Array,
  uploadedAt: Date
});

module.exports = mongoose.model('Upload', uploadSchema);
>>>>>>> main
