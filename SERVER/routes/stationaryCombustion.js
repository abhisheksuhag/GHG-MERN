const express = require('express');
const {
  addStationaryCombustion,
  getStationaryCombustionData,
  updateStationaryCombustion,
  deleteStationaryCombustion,
  finalSubmit
} = require('../controllers/stationaryCombustionController');

const router = express.Router();

// Add new stationary combustion data
router.post('/add', addStationaryCombustion);

// Final submission: create new entries or update existing ones
router.post('/final-submit', finalSubmit);

// Get stationary combustion data for a user
router.get('/:userId', getStationaryCombustionData);

// Update existing data
router.put('/update/:id', updateStationaryCombustion);

// Delete existing data
router.delete('/delete/:id', deleteStationaryCombustion);

module.exports = router;