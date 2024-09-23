export const categoryConfig = {
    stationaryCombustion: {
      pageTitle: 'Stationary Combustion',
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
    // Add other configurations here...
  };
