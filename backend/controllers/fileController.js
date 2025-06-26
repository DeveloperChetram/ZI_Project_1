const fs = require('fs');
const xlsx = require('xlsx');
const Upload = require('../models/Upload'); // MongoDB model

// Parse Excel file and return JSON
const parseExcel = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return xlsx.utils.sheet_to_json(sheet);
};

exports.uploadFile = async (req, res) => {
  try {
    const data = parseExcel(req.file.path);
    await Upload.create({
      filename: req.file.originalname,
      data,
      uploadedAt: new Date()
    });

    fs.unlinkSync(req.file.path); // Clean up file
    res.status(200).json({ message: 'File uploaded and saved' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await Upload.find().sort({ uploadedAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};
