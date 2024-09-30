const mongoose = require('mongoose');

// Fire Suppression - Material Balance Schema
const fireSuppressionMaterialBalanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sourceId: { type: String, required: true },
  gas: { type: String, required: true },
  gwp: { type: Number, required: true },
  inventoryChange: { type: Number, required: true },
  transferredAmount: { type: Number, required: true },
  capacityChange: { type: Number, required: true },
  co2Emissions: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  history: [{ updatedAt: { type: Date }, changes: { type: Object } }]
});

// Fire Suppression - Simplified Material Balance Schema
const fireSuppressionSimplifiedBalanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sourceId: { type: String, required: true },
  gas: { type: String, required: true },
  gwp: { type: Number, required: true },
  newUnitsCharge: { type: Number, required: true },
  newUnitsCapacity: { type: Number, required: true },
  existingUnitsRecharge: { type: Number, required: true },
  disposedUnitsCapacity: { type: Number, required: true },
  disposedUnitsRecovered: { type: Number, required: true },
  co2Emissions: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  history: [{ updatedAt: { type: Date }, changes: { type: Object } }]
});

// Fire Suppression - Screening Method Schema
const fireSuppressionScreeningMethodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sourceId: { type: String, required: true },
  equipmentType: { type: String, required: true },
  gas: { type: String, required: true },
  gasGwp: { type: Number, required: true },
  unitCapacity: { type: Number, required: true },
  co2Emissions: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  history: [{ updatedAt: { type: Date }, changes: { type: Object } }]
});

// Register the models
module.exports.FireSuppressionMaterialBalance = mongoose.model('FireSuppressionMaterialBalance', fireSuppressionMaterialBalanceSchema);
module.exports.FireSuppressionSimplifiedBalance = mongoose.model('FireSuppressionSimplifiedBalance', fireSuppressionSimplifiedBalanceSchema);
module.exports.FireSuppressionScreeningMethod = mongoose.model('FireSuppressionScreeningMethod', fireSuppressionScreeningMethodSchema);
