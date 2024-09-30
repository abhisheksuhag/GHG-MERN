module.exports = [
  {
    name: 'stationary-combustion',
    model: 'StationaryCombustion',
    hasSubSchemas: false,
  },
  {
    name: 'mobile-combustion',
    model: 'MobileCombustion',
    hasSubSchemas: false,
  },
  {
    name: 'refrigeration-combustion',
    model: 'RefrigerationCombustion',
    hasSubSchemas: true,
    subSchemas: [
      'MaterialBalance',
      'SimplifiedBalance',
      'ScreeningMethod'
      ],
  },
  {
    name: 'fire-suppression-combustion',
    model: 'FireSuppressionCombustion',
    hasSubSchemas: true,
    subSchemas: [
      'FireSuppressionMaterialBalance',
      'FireSuppressionSimplifiedBalance',
      'FireSuppressionScreeningMethod'
    ]
  },
  {
    name: 'gas-combustion',
    model: 'GasCombustion',
    hasSubSchemas: false,
  }
];
