export const calculationConfig = {
  stationaryCombustion: {
    pageTitle: 'Stationary Combustion Calculations',
    calculatedSections: [
      {
        title: 'Fuel Combustion Summary',
        key: 'FuelCombustionSummary',
        columns: [
          { label: 'Source ID', key: 'sourceId' },  // Added Source ID column
          { label: 'Fuel Type', key: 'fuelType' },
          { label: 'Quantity Combusted', key: 'quantityCombusted' },
          { label: 'Units', key: 'units' },
        ],
      },
      {
        title: 'Emissions Summary',
        key: 'EmissionsSummary',
        columns: [
          { label: 'Source ID', key: 'sourceId' },  // Added Source ID column
          { label: 'Fuel Type', key: 'fuelType' },
          { label: 'CO2 (kg)', key: 'co2Emissions' },
          { label: 'CH4 (g)', key: 'ch4Emissions' },
          { label: 'N2O (g)', key: 'n2oEmissions' },
        ],
      },
    ],
  },
  gasCombustion: {
    pageTitle: 'Gas Combustion Calculations',
    calculatedSections: [
      {
        title: 'Gas Combustion Emissions Summary',
        key: 'GasCombustionEmissions',
        columns: [
          { label: 'Source ID', key: 'sourceId' },  // Added Source ID column
          { label: 'CO2 Equivalent Emissions (metric tons)', key: 'co2EquivalentEmissions' },
        ],
      },
    ],
  },
  fireSuppressionCombustion: {
    pageTitle: 'Fire Suppression Calculations',
    calculatedSections: [
      {
        title: 'Fire Suppression Emissions Summary',
        key: 'FireSuppressionEmissions',
        columns: [
          { label: 'Source ID', key: 'sourceId' },  // Added Source ID column
          { label: 'CO2 Equivalent Emissions (metric tons)', key: 'co2EquivalentEmissions' },
        ],
      },
    ],
  },

  refrigerationCombustion: {
    pageTitle: 'Refrigeration and AC Calculations',
    calculatedSections: [
      {
        title: 'Refrigeration and AC Emissions Summary',
        key: 'RefrigerationCombustionEmissions',
        columns: [
          { label: 'Source ID', key: 'sourceId' },  // Added Source ID column
          { label: 'CO2 Equivalent Emissions (metric tons)', key: 'co2EquivalentEmissions' },
        ],
      },
    ],
  },










  mobileCombustion: {
    pageTitle: 'Mobile Combustion Calculations',
    calculatedSections: [
      {
        title: 'Fuel Usage and CO2 Emissions (On-Road and Off-Road Vehicles)',
        key: 'FuelUsageAndCO2Emissions',
        columns: [
          { label: 'Source ID', key: 'sourceId' },
          { label: 'Fuel Type', key: 'fuelType' },
          { label: 'Fuel Usage', key: 'fuelUsage' },
          { label: 'Units', key: 'units' },
          { label: 'CO2 (kg)', key: 'co2Emissions' },
        ],
      },
      {
        title: 'Mileage and CH4/N2O Emissions (On-Road Gasoline)',
        key: 'MileageAndCH4N2OEmissionsGasoline',
        columns: [
          { label: 'Source ID', key: 'sourceId' },
          { label: 'Vehicle Type', key: 'vehicleType' },
          { label: 'Vehicle Year', key: 'vehicleYear' },
          { label: 'Mileage (miles)', key: 'mileage' },
          { label: 'CH4 (g)', key: 'ch4Emissions' },
          { label: 'N2O (g)', key: 'n2oEmissions' },
        ],
      },
      {
        title: 'Mileage and CH4/N2O Emissions (On-Road Non-Gasoline)',
        key: 'MileageAndCH4N2OEmissionsNonGasoline',
        columns: [
          { label: 'Source ID', key: 'sourceId' },
          { label: 'Vehicle Type', key: 'vehicleType' },
          { label: 'Fuel Type', key: 'fuelType' },
          { label: 'Vehicle Year', key: 'vehicleYear' },
          { label: 'Mileage (miles)', key: 'mileage' },
          { label: 'CH4 (g)', key: 'ch4Emissions' },
          { label: 'N2O (g)', key: 'n2oEmissions' },
        ],
      },
      {
        title: 'Fuel Usage and CH4/N2O Emissions (Non-Road Vehicles)',
        key: 'FuelUsageAndCH4N2OEmissionsNonRoad',
        columns: [
          { label: 'Source ID', key: 'sourceId' },
          { label: 'Vehicle Type', key: 'vehicleType' },
          { label: 'Fuel Type', key: 'fuelType' },
          { label: 'Fuel Usage (gallons)', key: 'fuelUsage' },
          { label: 'CH4 (g)', key: 'ch4Emissions' },
          { label: 'N2O (g)', key: 'n2oEmissions' },
        ],
      },
      {
        title: 'Total CO₂ and Biomass CO₂ Equivalent Emissions (Mobile Sources)',
        key: 'TotalEmissionsMobileSources',
        columns: [
          { label: 'Source ID', key: 'sourceId' },
          { label: 'Total CO₂ Equivalent Emissions (metric tons)', key: 'totalCO2Emissions' },
          { label: 'Total Biomass CO₂ Equivalent Emissions (metric tons)', key: 'biomassCO2Emissions' },
        ],
      },
    ],
  },
  // Add other categories as needed...
};
