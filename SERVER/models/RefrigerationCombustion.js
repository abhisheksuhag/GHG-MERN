const mongoose = require('mongoose');

// Schema for the first table: Material Balance Method
const materialBalanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sourceId: { type: String, required: true },
  gas: { type: String, required: true },
  gwp: { type: Number, required: true },
  inventoryChange: { type: Number, required: true },
  transferredAmount: { type: Number, required: true },
  capacityChange: { type: Number, required: true },
  co2Emissions: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  history: [{ updatedAt: { type: Date }, changes: { type: Object } }],
});

// Schema for the second table: Simplified Material Balance Method
const simplifiedBalanceSchema = new mongoose.Schema({
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
  history: [{ updatedAt: { type: Date }, changes: { type: Object } }],
});

// Schema for the third table: Screening Method
const screeningMethodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sourceId: { type: String, required: true },
  equipmentType: { type: String, required: true },
  gas: { type: String, required: true },
  gasGwp: { type: Number, required: true },
  newUnitsCharge: { type: Number, required: true },
  monthsInOperation: { type: Number, required: true },
  operatingUnitsCapacity: { type: Number, required: true },
  disposedUnitsCapacity: { type: Number, required: true },
  co2Emissions: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  history: [{ updatedAt: { type: Date }, changes: { type: Object } }],
});

// Exporting all schemas
module.exports.MaterialBalance = mongoose.model('MaterialBalance', materialBalanceSchema);
module.exports.SimplifiedBalance = mongoose.model('SimplifiedBalance', simplifiedBalanceSchema);
module.exports.ScreeningMethod = mongoose.model('ScreeningMethod', screeningMethodSchema);
