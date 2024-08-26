const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['basic', 'detailed'],
    required: true,
  },
  scope: {
    type: String,
    enum: ['scope1', 'scope2', 'scope3'],
    required: true,
  },
  fieldType: {
    type: String,
    enum: ['text', 'number', 'select'],
    required: true,
  },
  options: {
    type: [String],
    required: function() { return this.fieldType === 'select'; }
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
