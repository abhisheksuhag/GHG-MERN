const express = require('express');
const router = express.Router();
const Answer = require('../models/Answer'); // Ensure you have an Answer model

// Initialize a simple counter for user IDs
let userIdCounter = 1;

router.post('/submit-answers', async (req, res) => {
  try {
    const { answers } = req.body;

    // Create a new answer entry with a timestamp and incremented userId
    const newAnswer = new Answer({
      userId: userIdCounter,
      answers: answers,
      timestamp: new Date(),
    });

    await newAnswer.save();

    // Increment the userId counter for the next submission
    userIdCounter++;

    res.status(201).json({ message: 'Answers submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit answers' });
  }
});

module.exports = router;
