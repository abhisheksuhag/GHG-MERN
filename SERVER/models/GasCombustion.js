const mongoose = require('mongoose');

// Schema for Purchased Gases
const gasCombustionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the user who added the data
  sourceId: { type: String, required: true },  // Unique identifier for the source
  gas: { type: String, required: true },  // The type of gas (e.g., CO₂, CH₄, etc.)
  gasGwp: { type: Number, required: true },  // Global Warming Potential (GWP) of the gas
  purchasedAmount: { type: Number, required: true },  // Amount of gas purchased (in pounds/lb)
  co2Emissions: { type: Number, required: true },  // CO₂ equivalent emissions (calculated in lb)
  timestamp: { type: Date, default: Date.now },  // Timestamp of the entry
  history: [
    {
      updatedAt: { type: Date },  // Timestamp for when the entry was updated
      changes: { type: Object },  // Record of what changes were made
    }
  ]
});

module.exports = mongoose.model('GasCombustion', gasCombustionSchema);
