const mongoose = require('mongoose');

// Sub-schema for the first table (Fuel Combustion Summary)
const fuelCombustionSummarySchema = new mongoose.Schema({
  sourceId: { type: String, required: true },
  fuelType: { type: String, required: true },
  quantityCombusted: { type: Number, required: true },
  units: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  history: [{ updatedAt: { type: Date }, changes: { type: Object } }]
});

// Sub-schema for the second table (Emissions Summary)
const emissionsSummarySchema = new mongoose.Schema({
  sourceId: { type: String, required: true },
  fuelType: { type: String, required: true },
  co2Emissions: { type: Number, required: true },
  ch4Emissions: { type: Number, required: true },
  n2oEmissions: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  history: [{ updatedAt: { type: Date }, changes: { type: Object } }]
});

// Exporting both subschemas
module.exports = {
  FuelCombustionSummary: mongoose.model('FuelCombustionSummary', fuelCombustionSummarySchema),
  EmissionsSummary: mongoose.model('EmissionsSummary', emissionsSummarySchema)
};
