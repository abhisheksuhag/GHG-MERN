const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  type: { type: String, required: true },
  options: { type: [String], default: [] },
  required: { type: Boolean, default: false },
  category: { type: String, required: true }, // 'basic' or 'detailed'
  scope: { type: String, required: true }, // Example: 'Scope 1', 'Scope 2', 'Scope 3'
});

module.exports = mongoose.model('Question', questionSchema);
