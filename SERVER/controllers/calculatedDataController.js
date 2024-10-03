// controllers/calculatedDataController.js
const mongoose = require('mongoose');

// Helper to dynamically load models and calculation logic based on category
const loadModelAndCalculation = (category) => {
  try {
    const CalculatedModel = require(`../models/${category}Calculated`);
    const CalculationLogic = require(`../DataCalculation/${category}Calculation`);
    return { CalculatedModel, CalculationLogic };
  } catch (error) {
    throw new Error(`Error loading model or calculation logic for category: ${category}`);
  }
};

// Controller method to fetch sourceIds
exports.getSourceIds = async (req, res) => {
  try {
    const { category } = req.params;
    const InputModel = require(`../models/${category}`); // Load the input model dynamically
    const sourceIds = await InputModel.find().distinct('sourceId'); // Fetch distinct sourceIds
    if (!sourceIds || sourceIds.length === 0) {
      console.log(`No sourceIds found for category: ${category}`);
      return res.status(404).json({ error: `No sourceIds found for category: ${category}` });
    }
    console.log(`Fetched sourceIds for ${category}:`, sourceIds);
    res.status(200).json(sourceIds);
  } catch (error) {
    console.error('Error fetching source IDs:', error);
    res.status(500).json({ error: 'Failed to fetch source IDs' });
  }
};

// Function to calculate emissions for all sourceIds
exports.calculateEmissionsForAll = async (sourceIds, category) => {
  try {
    const { CalculatedModel, CalculationLogic } = loadModelAndCalculation(category);

    // Iterate over all sourceIds to perform the calculation
    const calculationPromises = sourceIds.map(async (sourceId) => {
      console.log(`Processing sourceId: ${sourceId}`);

      // Fetch input data by sourceId
      const inputModel = require(`../models/${category}`);
      const inputData = await inputModel.findOne({ sourceId });

      if (!inputData) {
        console.log(`No input data found for sourceId: ${sourceId}`);
        return { sourceId, error: 'No input data found' };
      }

      // Perform calculation logic
      const calculatedData = await CalculationLogic.calculateEmissions([inputData]);

      // Save the calculated data to the database using the calculated models
      const saveResults = await Promise.all(
        Object.keys(CalculatedModel).map(async (subSchema) => {
          const model = CalculatedModel[subSchema];
          return model.create(calculatedData[subSchema]);
        })
      );

      console.log(`Successfully calculated for sourceId: ${sourceId}`);
      return { sourceId, calculatedData: saveResults };
    });

    // Wait for all calculations to complete
    const results = await Promise.all(calculationPromises);
    return results;
  } catch (error) {
    console.error('Error calculating emissions:', error.message);
    throw new Error('Failed to calculate emissions.');
  }
};

// POST: Calculate emissions for any category (handle request in the controller)
exports.calculateEmissions = async (req, res) => {
  try {
    const { category } = req.params;
    const InputModel = require(`../models/${category}`);

    // Fetch all distinct sourceIds
    const sourceIds = await InputModel.find().distinct('sourceId');

    if (!sourceIds || sourceIds.length === 0) {
      console.log(`No sourceIds found for category: ${category}`);
      return res.status(404).json({ error: `No sourceIds found for category: ${category}` });
    }

    console.log(`Fetched sourceIds for ${category}:`, sourceIds);

    // Call the calculateEmissionsForAll function, passing all sourceIds
    const result = await exports.calculateEmissionsForAll(sourceIds, category);

    // Send the calculated result as response
    res.status(200).json({ message: 'Calculations successful', result });
  } catch (error) {
    console.error('Error calculating emissions:', error);
    res.status(500).json({ error: 'Failed to calculate emissions.' });
  }
};

// GET: Retrieve both input and calculated data for a specific category and source ID
exports.getCategoryData = async (req, res) => {
  try {
    const { category, sourceId } = req.params;

    // Dynamically load models for input and calculated data
    const { CalculatedModel } = loadModelAndCalculation(category);
    const InputModel = require(`../models/${category}`);

    // Fetch input data
    const inputData = await InputModel.findOne({ sourceId });
    if (!inputData) {
      return res.status(404).json({ error: 'Input data not found for this source ID' });
    }

    // Fetch calculated data from each sub-schema dynamically
    const calculatedData = await Promise.all(
      Object.keys(CalculatedModel).map(async (subSchema) => {
        const model = CalculatedModel[subSchema];
        return model.findOne({ sourceId });
      })
    );

    // Combine input and calculated data
    res.status(200).json({ inputData, calculatedData });
  } catch (error) {
    console.error('Error retrieving data:', error.message);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
};
