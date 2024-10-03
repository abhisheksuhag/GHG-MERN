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
  // Add other categories as needed...
};
