const express = require('express');
const Answer = require('../models/Answer');
const router = express.Router();

// Submit Answers
router.post('/submit-answers', async (req, res) => {
  const { userId, answers } = req.body;

  try {
    const answerDocument = new Answer({
      userId: req.userId,  // Use the userId from the middleware
      answers,
      timestamp: new Date(),
    });

    await answerDocument.save();
    res.status(201).json({ message: 'Answers submitted successfully' });
  } catch (error) {
    console.error('Error saving answers:', error);
    res.status(500).json({ message: 'Failed to submit answers' });
  }
});

module.exports = router;
