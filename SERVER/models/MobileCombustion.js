// SERVER/models/MobileCombustion.js
const mongoose = require('mongoose');

const mobileCombustionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sourceId: { type: String, required: true },
  vehicleName: { type: String, required: true },
  fuelType: { type: String, required: true },
  fuelEfficiency: { type: Number, required: true },
  distance: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  history: [
    {
      updatedAt: { type: Date },
      changes: { type: Object }, // Record of what changed
    },
  ],
});

module.exports = mongoose.model('MobileCombustion', mobileCombustionSchema);
