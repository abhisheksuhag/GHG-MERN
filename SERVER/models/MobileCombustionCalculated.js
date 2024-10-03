const mongoose = require('mongoose');

// Sub-schema for the first table (Fuel Usage and CO2 Emissions)
const fuelUsageAndCO2EmissionsSchema = new mongoose.Schema({
  sourceId: { type: String, required: true },
  fuelType: { type: String, required: true },
  fuelUsage: { type: Number, required: true },
  units: { type: String, required: true },
  co2Emissions: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  history: [{ updatedAt: { type: Date }, changes: { type: Object } }],
});

// Sub-schema for the second table (Mileage and CH4/N2O Emissions - Gasoline)
const mileageAndCH4N2OEmissionsGasolineSchema = new mongoose.Schema({
  sourceId: { type: String, required: true },
  vehicleType: { type: String, required: true },
  vehicleYear: { type: Number, required: true },
  mileage: { type: Number, required: true },
  ch4Emissions: { type: Number, required: true },
  n2oEmissions: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  history: [{ updatedAt: { type: Date }, changes: { type: Object } }],
});

// Sub-schema for the third table (Mileage and CH4/N2O Emissions - Non-Gasoline)
const mileageAndCH4N2OEmissionsNonGasolineSchema = new mongoose.Schema({
  sourceId: { type: String, required: true },
  vehicleType: { type: String, required: true },
  fuelType: { type: String, required: true },
  vehicleYear: { type: Number, required: true },
  mileage: { type: Number, required: true },
  ch4Emissions: { type: Number, required: true },
  n2oEmissions: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  history: [{ updatedAt: { type: Date }, changes: { type: Object } }],
});

// Sub-schema for the fourth table (Fuel Usage and CH4/N2O Emissions - Non-Road)
const fuelUsageAndCH4N2OEmissionsNonRoadSchema = new mongoose.Schema({
  sourceId: { type: String, required: true },
  vehicleType: { type: String, required: true },
  fuelType: { type: String, required: true },
  fuelUsage: { type: Number, required: true },
  ch4Emissions: { type: Number, required: true },
  n2oEmissions: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  history: [{ updatedAt: { type: Date }, changes: { type: Object } }],
});

const totalEmissionsMobileSourcesSchema = new mongoose.Schema({
    sourceId: { type: String, required: true },
    totalCO2Emissions: { type: Number, required: true },
    biomassCO2Emissions: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    history: [{ updatedAt: { type: Date }, changes: { type: Object } }],
  });

// Exporting both subschemas
module.exports = {
  FuelUsageAndCO2Emissions: mongoose.model('FuelUsageAndCO2Emissions', fuelUsageAndCO2EmissionsSchema),
  MileageAndCH4N2OEmissionsGasoline: mongoose.model('MileageAndCH4N2OEmissionsGasoline', mileageAndCH4N2OEmissionsGasolineSchema),
  MileageAndCH4N2OEmissionsNonGasoline: mongoose.model('MileageAndCH4N2OEmissionsNonGasoline', mileageAndCH4N2OEmissionsNonGasolineSchema),
  FuelUsageAndCH4N2OEmissionsNonRoad: mongoose.model('FuelUsageAndCH4N2OEmissionsNonRoad', fuelUsageAndCH4N2OEmissionsNonRoadSchema),
  TotalEmissionsMobileSources: mongoose.model('TotalEmissionsMobileSources', totalEmissionsMobileSourcesSchema),
};
