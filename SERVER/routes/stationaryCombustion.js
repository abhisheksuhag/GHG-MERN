const StationaryCombustion = require('../models/StationaryCombustion');
const mongoose = require('mongoose');
const express = require('express');
const { addStationaryCombustion, getStationaryCombustionData, updateStationaryCombustion } = require('../controllers/stationaryCombustionController');

const router = express.Router();

// Add new stationary combustion data
router.post('/add', addStationaryCombustion);

// Add this new route to handle final submission
router.post('/final-submit', (req, res) => {
  const { userId, data } = req.body;

  console.log('Received userId:', userId);  // Log userId
  console.log('Received data:', data);  // Log the data

  if (!userId || !data || data.length === 0) {
    return res.status(400).json({ message: 'User ID and data are required.' });
  }

  // Save each entry in the data array
  const promises = data.map(async (entry) => {
    try {
      console.log('Saving entry:', entry);  // Log each entry before saving

      // Correctly convert userId to ObjectId
      const newEntry = new StationaryCombustion({
        userId: new mongoose.Types.ObjectId(userId),  // Correct use of 'new' keyword
        sourceId: entry.sourceId,
        siteName: entry.site,
        sourceDescription: entry.sourceDescription,
        fuelType: entry.fuelType,
        fuelState: entry.fuelState,
        quantity: Number(entry.quantity),
        unit: entry.unit,
      });

      await newEntry.save(); // Save each entry
      console.log('Entry saved:', newEntry);  // Log the saved entry
      return { success: true };
    } catch (error) {
      console.error('Error saving entry:', error);  // Log the error with details
      return { success: false, error: error.message };
    }
  });

  // Execute all save operations in parallel
  Promise.all(promises)
    .then((results) => {
      const successCount = results.filter((result) => result.success).length;
      const failureCount = results.length - successCount;
      return res.status(200).json({
        message: `Final submit successful. ${successCount} entries saved, ${failureCount} failures.`,
      });
    })
    .catch((err) => {
      console.error('Error during final submit:', err);  // Log any error from the Promise
      return res.status(500).json({ message: 'Error during final submit', error: err.message });
    });
});

// Get stationary combustion data for a user
router.get('/:userId', getStationaryCombustionData);

// Update existing data
router.put('/update/:id', updateStationaryCombustion);

module.exports = router;
