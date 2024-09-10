const StationaryCombustion = require('../models/StationaryCombustion');
const mongoose = require('mongoose');
const express = require('express');
const { addStationaryCombustion, getStationaryCombustionData, updateStationaryCombustion } = require('../controllers/stationaryCombustionController');

const router = express.Router();

// Add new stationary combustion data
router.post('/add', addStationaryCombustion);

// Final submission: create new entries or update existing ones
router.post('/final-submit', async (req, res) => {
  const { userId, data } = req.body;

  if (!userId || !data || data.length === 0) {
    return res.status(400).json({ message: 'User ID and data are required.' });
  }

  try {
    // Save or update each entry in the data array
    const promises = data.map(async (entry) => {
      try {
        // Check if an entry with the same sourceId exists for the user
        const existingEntry = await StationaryCombustion.findOne({ userId, sourceId: entry.sourceId });

        if (existingEntry) {
          // Add the current state to the history before updating
          existingEntry.history.push({
            updatedAt: new Date(),
            changes: {
              siteName: existingEntry.siteName,
              sourceDescription: existingEntry.sourceDescription,
              area: existingEntry.area,
              fuelType: existingEntry.fuelType,
              fuelState: existingEntry.fuelState,
              quantity: existingEntry.quantity,
              unit: existingEntry.unit,
            },
          });

          // Update the entry with the new data
          existingEntry.siteName = entry.site;
          existingEntry.sourceDescription = entry.sourceDescription;
          existingEntry.area = Number(entry.area);
          existingEntry.fuelType = entry.fuelType;
          existingEntry.fuelState = entry.fuelState;
          existingEntry.quantity = Number(entry.quantity);
          existingEntry.unit = entry.unit;

          await existingEntry.save(); // Save the updated entry
          return { success: true, updated: true };
        } else {
          // If no existing entry, create a new one
          const newEntry = new StationaryCombustion({
            userId: new mongoose.Types.ObjectId(userId), // Correctly convert userId to ObjectId
            sourceId: entry.sourceId,
            siteName: entry.site,
            sourceDescription: entry.sourceDescription,
            area: Number(entry.area),
            fuelType: entry.fuelType,
            fuelState: entry.fuelState,
            quantity: Number(entry.quantity),
            unit: entry.unit,
          });

          await newEntry.save(); // Save the new entry
          return { success: true, created: true };
        }
      } catch (error) {
        console.error('Error saving entry:', error); // Log the error with details
        return { success: false, error: error.message };
      }
    });

    // Execute all save operations in parallel
    const results = await Promise.all(promises);
    const successCount = results.filter((result) => result.success).length;
    const failureCount = results.length - successCount;

    res.status(200).json({
      message: `Final submit successful. ${successCount} entries saved, ${failureCount} failures.`,
    });
  } catch (err) {
    console.error('Error during final submit:', err); // Log any error from the Promise
    return res.status(500).json({ message: 'Error during final submit', error: err.message });
  }
});

// Get stationary combustion data for a user
router.get('/:userId', getStationaryCombustionData);

// Update existing data
router.put('/update/:id', updateStationaryCombustion);

module.exports = router;
