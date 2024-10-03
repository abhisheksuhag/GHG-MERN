const emissionsFactors = {
    stationaryCombustion: {
      'Anthracite Coal': {
        co2Factor: 228.6, // kg CO2 per short ton
        ch4Factor: 0.01,  // g CH4 per short ton
        n2oFactor: 0.002, // g N2O per short ton
      },
      'Bituminous Coal': {
        co2Factor: 205.3, // kg CO2 per short ton
        ch4Factor: 0.02,  // g CH4 per short ton
        n2oFactor: 0.004, // g N2O per short ton
      },
      'Sub-bituminous Coal': {
        co2Factor: 214.3, // kg CO2 per short ton
        ch4Factor: 0.015, // g CH4 per short ton
        n2oFactor: 0.003, // g N2O per short ton
      },
      'Natural Gas': {
        co2Factor: 53.02,  // kg CO2 per 1000 cubic feet
        ch4Factor: 1,      // g CH4 per 1000 cubic feet
        n2oFactor: 0.1,    // g N2O per 1000 cubic feet
      },
      // Add other fuels and factors here
    },
    // You can add different emission factors for other categories (like mobile combustion) here
  };
  
  module.exports = emissionsFactors;
