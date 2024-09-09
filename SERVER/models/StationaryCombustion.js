// SERVER/models/StationaryCombustion.js
const mongoose = require('mongoose');

const stationaryCombustionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Will link to user collection later
  sourceId: { type: String, required: true }, // Auto-generated
  siteName: { type: String, required: true },
  sourceDescription: { type: String, required: true },
  fuelType: { type: String, required: true },
  fuelState: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }, // Automatically generated
  history: [
    {
      updatedAt: { type: Date },
      changes: { type: Object }, // Record of what changed
    },
  ],
});

module.exports = mongoose.model('StationaryCombustion', stationaryCombustionSchema);
