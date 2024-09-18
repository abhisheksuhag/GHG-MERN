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
            { label: 'Vehicle Name', type: 'text', key: 'vehicleName' },
            { label: 'Fuel Type', type: 'dropdown', key: 'fuelType', options: ['Diesel', 'Petrol'] },
            { label: 'Fuel Efficiency (mpg)', type: 'number', key: 'fuelEfficiency' },
            { label: 'Total Distance (miles)', type: 'number', key: 'distance' },
          ],
          columns: [
            { label: 'Vehicle Name', key: 'vehicleName' },
            { label: 'Fuel Type', key: 'fuelType' },
            { label: 'Fuel Efficiency (mpg)', key: 'fuelEfficiency' },
            { label: 'Total Distance (miles)', key: 'distance' },
          ],
        },
      ],
    },
    // Add other configurations here...
  };
