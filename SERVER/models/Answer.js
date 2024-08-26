const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  answers: {
    type: Map,
    of: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Answer', AnswerSchema);
