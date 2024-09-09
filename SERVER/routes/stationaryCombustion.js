// SERVER/routes/stationaryCombustion.js
const express = require('express');
const { addStationaryCombustion, getStationaryCombustionData, updateStationaryCombustion } = require('../controllers/stationaryCombustionController');

const router = express.Router();

// Add new stationary combustion data
router.post('/add', addStationaryCombustion);

// Get stationary combustion data for a user
router.get('/:userId', getStationaryCombustionData);

// Update existing data
router.put('/update/:id', updateStationaryCombustion);

module.exports = router;
