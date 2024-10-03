const emissionsFactors = require('../config/emissionsFactors');

// Function to calculate emissions for stationary combustion
const calculateEmissions = async (inputData) => {
  const fuelCombustionSummary = [];
  const emissionsSummary = [];

  // Loop over the input data (for each fuel type)
  for (const entry of inputData) {
    const { sourceId, fuelType, quantityCombusted, units } = entry;

    // Fetch the emission factors for the specific fuel type
    const factors = emissionsFactors.stationaryCombustion[fuelType];

    if (!factors) {
      throw new Error(`Emission factors not found for fuel type: ${fuelType}`);
    }

    // Convert quantity combusted to metric tons if needed (assuming input is in short tons or gallons)
    let quantityInMetricTons;
    if (units === 'short ton') {
      quantityInMetricTons = quantityCombusted * 0.90718474; // Convert short ton to metric ton
    } else if (units === 'gallons') {
      // Conversion logic for liquids (if applicable)
      quantityInMetricTons = quantityCombusted * 0.00378541; // Example: Convert gallons to cubic meters
    } else {
      // Handle other units as needed
      quantityInMetricTons = quantityCombusted; // Assume metric tons
    }

    // Calculate emissions (CO2, CH4, N2O) based on factors and quantity combusted
    const co2Emissions = quantityInMetricTons * factors.co2Factor;
    const ch4Emissions = quantityInMetricTons * factors.ch4Factor;
    const n2oEmissions = quantityInMetricTons * factors.n2oFactor;

    // Prepare the fuel combustion summary data
    fuelCombustionSummary.push({
      sourceId,
      fuelType,
      quantityCombusted,
      units,
    });

    // Prepare the emissions summary data
    emissionsSummary.push({
      sourceId,
      fuelType,
      co2Emissions: co2Emissions.toFixed(2),
      ch4Emissions: ch4Emissions.toFixed(2),
      n2oEmissions: n2oEmissions.toFixed(2),
    });
  }

  // Return both the fuel combustion summary and emissions summary for saving
  return {
    FuelCombustionSummary: fuelCombustionSummary,
    EmissionsSummary: emissionsSummary,
  };
};

module.exports = {
  calculateEmissions,
};
