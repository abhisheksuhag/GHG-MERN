const mongoose = require('mongoose');

const mobileCombustionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sourceId: { type: String, required: true },  // Unique identifier for the source
  sourceDescription: { type: String, required: true },  // Description of the combustion source
  onRoad: { type: String, enum: ['OnRoad', 'NonRoad'], required: true },  // OnRoad or NonRoad
  vehicleType: { type: String, required: true },  // Type of vehicle
  vehicleYear: { type: Number, required: true },  // Year of the vehicle
  fuelUsage: { type: Number, required: true },  // Fuel usage
  units: { type: String, enum: ['gal', 'liters'], required: true },  // Units for fuel usage
  milesTraveled: { type: Number, required: true },  // Miles traveled
  biodieselPercent: { type: Number, required: true },  // Biodiesel percentage
  ethanolPercent: { type: Number, required: true },  // Ethanol percentage
  timestamp: { type: Date, default: Date.now },  // Timestamp of the entry
  history: [
    {
      updatedAt: { type: Date },
      changes: { type: Object }  // Record of what changed
    }
  ]
});

module.exports = mongoose.model('MobileCombustion', mobileCombustionSchema);
