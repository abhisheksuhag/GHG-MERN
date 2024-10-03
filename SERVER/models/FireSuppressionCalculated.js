const mongoose = require('mongoose');

// Schema for Fire Suppression Emissions
const fireSuppressionEmissionsSchema = new mongoose.Schema({
  sourceId: { type: String, required: true },  // Unique Source ID
  co2EquivalentEmissions: { type: Number, required: true },  // CO2 Equivalent Emissions in metric tons
  timestamp: { type: Date, default: Date.now },  // Timestamp for when the data is saved
  history: [{ updatedAt: { type: Date }, changes: { type: Object } }]  // Track history of changes
});

// Exporting the schema
module.exports = {
  FireSuppressionEmissions: mongoose.model('FireSuppressionEmissions', fireSuppressionEmissionsSchema),
};
