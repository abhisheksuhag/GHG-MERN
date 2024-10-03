// routes/calculatedDataRoutes.js
const express = require('express');
const router = express.Router();
const calculatedDataController = require('../controllers/calculatedDataController');

// Generalized route to calculate emissions for any category (handling multiple sub-schemas)
router.post('/calculate/:category', calculatedDataController.calculateEmissions);

// Generalized route to get combined input and calculated data for a specific source ID (handling multiple sub-schemas)
router.get('/:category/:sourceId', calculatedDataController.getCategoryData);

// Generalized route to fetch distinct sourceIds for any category
router.get('/:category/sourceIds', calculatedDataController.getSourceIds);

module.exports = router;
