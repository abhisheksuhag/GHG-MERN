// SERVER/models/MobileCombustion.js
// const mongoose = require('mongoose');

// const mobileCombustionSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   sourceId: { type: String, required: true },
//   vehicleName: { type: String, required: true },
//   fuelType: { type: String, required: true },
//   fuelEfficiency: { type: Number, required: true },
//   distance: { type: Number, required: true },
//   timestamp: { type: Date, default: Date.now },
//   history: [
//     {
//       updatedAt: { type: Date },
//       changes: { type: Object }, // Record of what changed
//     },
//   ],
// });

// module.exports = mongoose.model('MobileCombustion', mobileCombustionSchema);



// SERVER/models/MobileCombustion.js
const mongoose = require('mongoose');

const mobileCombustionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sourceId: { type: String, required: true },
  sourceDescription: { type: String, required: true },
  onRoad: { type: String, required: true },
  vehicleType: { type: String, required: true },
  vehicleYear: { type: Number, required: true },
  fuelUsage: { type: Number, required: true },
  units: { type: String, required: true },
  milesTraveled: { type: Number, required: true },
  biodieselPercent: { type: Number, default: 0 },
  ethanolPercent: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
  history: [
    {
      updatedAt: { type: Date },
      changes: { type: Object } // Record of what changed
    }
  ],
});

module.exports = mongoose.model('MobileCombustion', mobileCombustionSchema);
