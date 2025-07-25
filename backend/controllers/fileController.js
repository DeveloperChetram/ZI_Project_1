const fs = require('fs');
const ExcelJS = require('exceljs');
const Upload = require('../models/Upload'); // MongoDB model

// Parse Excel using ExcelJS and return JSON
const parseExcel = async (filePath) => {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.worksheets[0]; // First sheet

  const rows = [];
  const header = [];

  worksheet.getRow(1).eachCell((cell) => {
    header.push(cell.value);
  });

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // Skip header row

    const rowData = {};
    row.eachCell((cell, colNumber) => {
      rowData[header[colNumber - 1]] = cell.value;
    });

    rows.push(rowData);
  });

  return rows;
};

// Associate file with the logged-in user
exports.uploadFile = async (req, res) => {
  try {
    const data = await parseExcel(req.file.path);
    
    // req.user is added by the 'auth' middleware
    await Upload.create({
      filename: req.file.originalname,
      data,
      user: req.user._id // Link to the user
    });

    fs.unlinkSync(req.file.path); // Clean up uploaded file
    res.status(200).json({ message: 'File uploaded and saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

// Fetch history only for the logged-in user
exports.getHistory = async (req, res) => {
  try {
    const history = await Upload.find({ user: req.user._id }).sort({ uploadedAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};