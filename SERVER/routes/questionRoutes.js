const express = require('express');
const Question = require('../models/Question');
const router = express.Router();

router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
