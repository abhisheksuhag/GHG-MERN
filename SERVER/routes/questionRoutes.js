const express = require('express');
const Question = require('../models/Question');
const router = express.Router();

// Fetch Questions by Category
router.get('/questions', async (req, res) => {
  const { category } = req.query;

  try {
    const questions = await Question.find({ category });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch questions' });
  }
});

module.exports = router;
