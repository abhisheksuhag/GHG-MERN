export const categoryConfig = {
  stationaryCombustion: {
    pageTitle: 'Stationary Combustion',
    hasSubSchemas: false,
    sections: [
      {
        addButtonLabel: 'Add Combustion Source',
        description: 'Add details about stationary combustion sources.',
        fields: [
          { label: 'Site Name', type: 'text', key: 'siteName' },
          { label: 'Source Description', type: 'text', key: 'sourceDescription' },
          { label: 'Source Area (sq ft)', type: 'number', key: 'area' },
          { label: 'Fuel Type', type: 'dropdown', key: 'fuelType', options: ['Diesel', 'Petrol', 'Natural Gas'] },
          { label: 'Fuel State', type: 'dropdown', key: 'fuelState', options: ['Solid', 'Liquid', 'Gas'] },
          { label: 'Quantity Combusted', type: 'number', key: 'quantity' },
          { label: 'Units', type: 'dropdown', key: 'unit', options: ['MMBtu', 'Gallons'] },
        ],
        columns: [
          { label: 'Source ID', key: 'sourceId' },
          { label: 'Site Name', key: 'siteName' },
          { label: 'Source Description', key: 'sourceDescription' },
          { label: 'Source Area (sq ft)', key: 'area' },
          { label: 'Fuel Type', key: 'fuelType' },
          { label: 'Fuel State', key: 'fuelState' },
          { label: 'Quantity', key: 'quantity' },
          { label: 'Units', key: 'unit' },
        ],
      },
    ],
  },

  mobileCombustion: {
    pageTitle: 'Mobile Combustion',
    hasSubSchemas: false,
    sections: [
      {
        addButtonLabel: 'Add Mobile Combustion Source',
        description: 'Add details about mobile combustion sources.',
        fields: [
          { label: 'Source Description', type: 'text', key: 'sourceDescription' },  // e.g., HQ Fleet
          { label: 'OnRoad / NonRoad', type: 'dropdown', key: 'onRoad', options: ['OnRoad', 'NonRoad'] },  // OnRoad or NonRoad
          { label: 'Vehicle Type', type: 'text', key: 'vehicleType' },  // e.g., Passenger Cars - Gasoline
          { label: 'Vehicle Year', type: 'number', key: 'vehicleYear' },  // e.g., 2019
          { label: 'Fuel Usage', type: 'number', key: 'fuelUsage' },  // e.g., 500
          { label: 'Units', type: 'dropdown', key: 'units', options: ['gal', 'liters'] },  // e.g., gal
          { label: 'Miles Traveled', type: 'number', key: 'milesTraveled' },  // e.g., 12,400
          { label: 'Biodiesel Percent', type: 'number', key: 'biodieselPercent' },  // e.g., 90%
          { label: 'Ethanol Percent', type: 'number', key: 'ethanolPercent' },  // e.g., 80%
        ],
        columns: [
          { label: 'Source ID', key: 'sourceId' },
          { label: 'Source Description', key: 'sourceDescription' },
          { label: 'OnRoad / NonRoad', key: 'onRoad' },
          { label: 'Vehicle Type', key: 'vehicleType' },
          { label: 'Vehicle Year', key: 'vehicleYear' },
          { label: 'Fuel Usage', key: 'fuelUsage' },
          { label: 'Units', key: 'units' },
          { label: 'Miles Traveled', key: 'milesTraveled' },
          { label: 'Biodiesel Percent', key: 'biodieselPercent' },
          { label: 'Ethanol Percent', key: 'ethanolPercent' },
        ],
      },
    ],
  },

  refrigerationCombustion: {
    pageTitle: 'Refrigeration Combustion',
    hasSubSchemas: true,
    sections: [
      {
        key: 'MaterialBalance',
        addButtonLabel: 'Add Refrigeration Gas Data',
        description: 'Add details for Organization-Wide Refrigeration Gas CO2 Equivalent Emissions (Material Balance Method).',
        fields: [
          { label: 'Gas', type: 'text', key: 'gas' },
          { label: 'GWP', type: 'number', key: 'gwp' },
          { label: 'Inventory Change (kg)', type: 'number', key: 'inventoryChange' },
          { label: 'Transferred Amount (kg)', type: 'number', key: 'transferredAmount' },
          { label: 'Capacity Change (kg)', type: 'number', key: 'capacityChange' },
          { label: 'CO2 Equivalent Emissions (kg)', type: 'number', key: 'co2Emissions' },
        ],
        columns: [
          { label: 'Source ID', key: 'sourceId' },  // Added Source ID
          { label: 'Gas', key: 'gas' },
          { label: 'GWP', key: 'gwp' },
          { label: 'Inventory Change (kg)', key: 'inventoryChange' },
          { label: 'Transferred Amount (kg)', key: 'transferredAmount' },
          { label: 'Capacity Change (kg)', key: 'capacityChange' },
          { label: 'CO2 Equivalent Emissions (kg)', key: 'co2Emissions' },  // Added CO2 Emissions
        ],
      },
      {
        key: 'SimplifiedBalance',
        addButtonLabel: 'Add Refrigeration Gas Data (Simplified)',
        description: 'Add details for Organization-Wide Refrigeration Gas CO2 Equivalent Emissions (Simplified Material Balance Method).',
        fields: [
          { label: 'Gas', type: 'text', key: 'gas' },
          { label: 'GWP', type: 'number', key: 'gwp' },
          { label: 'New Units Charge (kg)', type: 'number', key: 'newUnitsCharge' },
          { label: 'New Units Capacity (kg)', type: 'number', key: 'newUnitsCapacity' },
          { label: 'Existing Units Recharge (kg)', type: 'number', key: 'existingUnitsRecharge' },
          { label: 'Disposed Units Capacity (kg)', type: 'number', key: 'disposedUnitsCapacity' },
          { label: 'Disposed Units Recovered (kg)', type: 'number', key: 'disposedUnitsRecovered' },
          { label: 'CO2 Equivalent Emissions (kg)', type: 'number', key: 'co2Emissions' },  // Added CO2 Emissions
        ],
        columns: [
          { label: 'Source ID', key: 'sourceId' },  // Added Source ID
          { label: 'Gas', key: 'gas' },
          { label: 'GWP', key: 'gwp' },
          { label: 'New Units Charge (kg)', key: 'newUnitsCharge' },
          { label: 'New Units Capacity (kg)', key: 'newUnitsCapacity' },
          { label: 'Existing Units Recharge (kg)', key: 'existingUnitsRecharge' },
          { label: 'Disposed Units Capacity (kg)', key: 'disposedUnitsCapacity' },
          { label: 'Disposed Units Recovered (kg)', key: 'disposedUnitsRecovered' },
          { label: 'CO2 Equivalent Emissions (kg)', key: 'co2Emissions' },  // Added CO2 Emissions
        ],
      },
      {
        key: 'ScreeningMethod',
        addButtonLabel: 'Add Refrigeration Source Level Data',
        description: 'Add details for Source Level Refrigeration Gas CO2 Equivalent Emissions (Screening Method).',
        fields: [
          { label: 'Type of Equipment', type: 'text', key: 'equipmentType' },
          { label: 'Gas', type: 'text', key: 'gas' },
          { label: 'Gas GWP', type: 'number', key: 'gasGwp' },
          { label: 'New Units Charge (kg)', type: 'number', key: 'newUnitsCharge' },
          { label: 'Number of Months in Operation', type: 'number', key: 'monthsInOperation' },
          { label: 'Operating Units Capacity (kg)', type: 'number', key: 'operatingUnitsCapacity' },
          { label: 'Disposed Units Capacity (kg)', type: 'number', key: 'disposedUnitsCapacity' },
          { label: 'CO2 Equivalent Emissions (kg)', type: 'number', key: 'co2Emissions' },  // Added CO2 Emissions
        ],
        columns: [
          { label: 'Source ID', key: 'sourceId' },  // Added Source ID
          { label: 'Type of Equipment', key: 'equipmentType' },
          { label: 'Gas', key: 'gas' },
          { label: 'Gas GWP', key: 'gasGwp' },
          { label: 'New Units Charge (kg)', key: 'newUnitsCharge' },
          { label: 'Number of Months in Operation', key: 'monthsInOperation' },
          { label: 'Operating Units Capacity (kg)', key: 'operatingUnitsCapacity' },
          { label: 'Disposed Units Capacity (kg)', key: 'disposedUnitsCapacity' },
          { label: 'CO2 Equivalent Emissions (kg)', key: 'co2Emissions' },  // Added CO2 Emissions
        ],
      },
    ],
  },


  gasCombustion: {
    pageTitle: 'Gas Combustion',
    hasSubSchemas: false,
    sections: [
      {
        addButtonLabel: 'Add Purchased Gas Data',
        description: 'Add details about purchased gases and their CO2 equivalent emissions.',
        fields: [
          { label: 'Gas', type: 'text', key: 'gas' },  // Type of gas (e.g., CO2, CH4, etc.)
          { label: 'Gas GWP', type: 'number', key: 'gasGwp' },  // Global Warming Potential of the gas
          { label: 'Purchased Amount (lb)', type: 'number', key: 'purchasedAmount' },  // Amount of gas purchased in pounds
          { label: 'CO2 Equivalent Emissions (lb)', type: 'number', key: 'co2Emissions' },  // CO2 equivalent emissions in pounds
        ],
        columns: [
          { label: 'Source ID', key: 'sourceId' },  // Unique source ID for tracking
          { label: 'Gas', key: 'gas' },  // Gas type
          { label: 'Gas GWP', key: 'gasGwp' },  // Global Warming Potential
          { label: 'Purchased Amount (lb)', key: 'purchasedAmount' },  // Purchased gas amount in pounds
          { label: 'CO2 Equivalent Emissions (lb)', key: 'co2Emissions' },  // CO2 equivalent emissions
        ],
      },
    ],
  },

  // Fire Suppression Category Configuration
  fireSuppressionCombustion: {
    pageTitle: 'Fire Suppression Combustion',
    hasSubSchemas: true,
    sections: [
      {
        key: 'FireSuppressionMaterialBalance',
        addButtonLabel: 'Add Fire Suppression Gas Data (Material Balance)',
        description: 'Add details for Organization-Wide Fire Suppression Gas CO2 Equivalent Emissions (Material Balance Method).',
        fields: [
          { label: 'Gas', type: 'text', key: 'gas' },
          { label: 'GWP', type: 'number', key: 'gwp' },
          { label: 'Inventory Change (lb)', type: 'number', key: 'inventoryChange' },
          { label: 'Transferred Amount (lb)', type: 'number', key: 'transferredAmount' },
          { label: 'Capacity Change (lb)', type: 'number', key: 'capacityChange' },
          { label: 'CO2 Equivalent Emissions (lb)', type: 'number', key: 'co2Emissions' },
        ],
        columns: [
          { label: 'Source ID', key: 'sourceId' },
          { label: 'Gas', key: 'gas' },
          { label: 'GWP', key: 'gwp' },
          { label: 'Inventory Change (lb)', key: 'inventoryChange' },
          { label: 'Transferred Amount (lb)', key: 'transferredAmount' },
          { label: 'Capacity Change (lb)', key: 'capacityChange' },
          { label: 'CO2 Equivalent Emissions (lb)', key: 'co2Emissions' },
        ],
      },
      {
        key: 'FireSuppressionSimplifiedBalance',
        addButtonLabel: 'Add Fire Suppression Gas Data (Simplified)',
        description: 'Add details for Organization-Wide Fire Suppression Gas CO2 Equivalent Emissions (Simplified Material Balance Method).',
        fields: [
          { label: 'Gas', type: 'text', key: 'gas' },
          { label: 'GWP', type: 'number', key: 'gwp' },
          { label: 'New Units Charge (lb)', type: 'number', key: 'newUnitsCharge' },
          { label: 'New Units Capacity (lb)', type: 'number', key: 'newUnitsCapacity' },
          { label: 'Existing Units Recharge (lb)', type: 'number', key: 'existingUnitsRecharge' },
          { label: 'Disposed Units Capacity (lb)', type: 'number', key: 'disposedUnitsCapacity' },
          { label: 'Disposed Units Recovered (lb)', type: 'number', key: 'disposedUnitsRecovered' },
          { label: 'CO2 Equivalent Emissions (lb)', type: 'number', key: 'co2Emissions' },
        ],
        columns: [
          { label: 'Source ID', key: 'sourceId' },
          { label: 'Gas', key: 'gas' },
          { label: 'GWP', key: 'gwp' },
          { label: 'New Units Charge (lb)', key: 'newUnitsCharge' },
          { label: 'New Units Capacity (lb)', key: 'newUnitsCapacity' },
          { label: 'Existing Units Recharge (lb)', key: 'existingUnitsRecharge' },
          { label: 'Disposed Units Capacity (lb)', key: 'disposedUnitsCapacity' },
          { label: 'Disposed Units Recovered (lb)', key: 'disposedUnitsRecovered' },
          { label: 'CO2 Equivalent Emissions (lb)', key: 'co2Emissions' },
        ],
      },
      {
        key: 'FireSuppressionScreeningMethod',
        addButtonLabel: 'Add Fire Suppression Source Level Data',
        description: 'Add details for Source Level Fire Suppression Gas CO2 Equivalent Emissions (Screening Method).',
        fields: [
          { label: 'Type of Equipment', type: 'text', key: 'equipmentType' },
          { label: 'Gas', type: 'text', key: 'gas' },
          { label: 'Gas GWP', type: 'number', key: 'gasGwp' },
          { label: 'Unit Capacity (lb)', type: 'number', key: 'unitCapacity' },
          { label: 'CO2 Equivalent Emissions (lb)', type: 'number', key: 'co2Emissions' },
        ],
        columns: [
          { label: 'Source ID', key: 'sourceId' },
          { label: 'Type of Equipment', key: 'equipmentType' },
          { label: 'Gas', key: 'gas' },
          { label: 'Gas GWP', key: 'gasGwp' },
          { label: 'Unit Capacity (lb)', key: 'unitCapacity' },
          { label: 'CO2 Equivalent Emissions (lb)', key: 'co2Emissions' },
        ],
      },
    ],
  },


};
