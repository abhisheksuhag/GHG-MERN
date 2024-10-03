const mongoose = require('mongoose');

// Sub-schema for Refrigeration and AC Emissions Summary
const refrigerationCombustionEmissionsSchema = new mongoose.Schema({
  sourceId: { type: String, required: true },
  co2EquivalentEmissions: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },  // Automatic timestamp for when the entry is created
  history: [{ updatedAt: { type: Date }, changes: { type: Object } }]  // To track changes over time
});

// Exporting the Refrigeration and AC Calculated Model
module.exports = {
  RefrigerationCombustionEmissions: mongoose.model('RefrigerationCombustionEmissions', refrigerationCombustionEmissionsSchema)
};
