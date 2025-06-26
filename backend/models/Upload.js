import { Schema, model } from 'mongoose';

const uploadSchema = new Schema({
  filename: String,
  data: Array,
  uploadedAt: Date
});

export default model('Upload', uploadSchema);
