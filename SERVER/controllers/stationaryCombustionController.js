const StationaryCombustion = require('../models/StationaryCombustion');
const { generateSourceId } = require('../utils/helpers'); // Ensure this import exists

// Add new stationary combustion data or update existing data
exports.addStationaryCombustion = async (req, res) => {
  const { userId, siteName, sourceDescription, fuelType, fuelState, quantity, unit } = req.body;

  try {
    // Log request body for debugging
    console.log("Request Body:", req.body);

    // Validate the input fields
    if (!userId || !siteName || !sourceDescription || !fuelType || !fuelState || !quantity || !unit) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if the entry for this userId and siteName already exists
    const existingEntry = await StationaryCombustion.findOne({ userId, siteName });

    if (existingEntry) {
      // Log existing data for debugging
      console.log("Existing Entry Found:", existingEntry);

      // Save the current data in the history before updating
      existingEntry.history.push({
        updatedAt: new Date(),
        changes: {
          sourceDescription: existingEntry.sourceDescription,
          fuelType: existingEntry.fuelType,
          fuelState: existingEntry.fuelState,
          quantity: existingEntry.quantity,
          unit: existingEntry.unit,
        },
      });

      // Update with new data
      existingEntry.sourceDescription = sourceDescription;
      existingEntry.fuelType = fuelType;
      existingEntry.fuelState = fuelState;
      existingEntry.quantity = quantity;
      existingEntry.unit = unit;
      existingEntry.timestamp = new Date(); // Update timestamp

      // Save the updated entry
      await existingEntry.save();
      return res.status(200).json({
        message: 'Stationary Combustion Data Updated Successfully',
        updatedEntry: existingEntry,
      });
    }

    // If no existing entry, create a new one
    const sourceId = generateSourceId(siteName); // Generate a source ID based on the site name
    console.log("Generated Source ID:", sourceId);

    const newEntry = new StationaryCombustion({
      userId,
      sourceId,
      siteName,
      sourceDescription,
      fuelType,
      fuelState,
      quantity,
      unit,
      timestamp: new Date(), // Store timestamp of creation
    });

    // Save the new entry
    await newEntry.save();
    res.status(201).json({
      message: 'New Stationary Combustion Data Added Successfully',
      newEntry,
    });
  } catch (error) {
    console.error("Error adding data:", error); // Log the error for debugging
    res.status(500).json({ message: 'Error adding data', error: error.message || error });
  }
};

// Retrieve all stationary combustion data for a specific user
exports.getStationaryCombustionData = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch all data for the specific userId
    const data = await StationaryCombustion.find({ userId });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error retrieving data:", error); // Log the error for debugging
    res.status(500).json({ message: 'Error retrieving data', error: error.message || error });
  }
};

// Update existing stationary combustion data
exports.updateStationaryCombustion = async (req, res) => {
  const { id } = req.params;
  const { siteName, sourceDescription, fuelType, fuelState, quantity, unit } = req.body;

  try {
    // Find the existing entry by its ID
    const existingData = await StationaryCombustion.findById(id);

    if (!existingData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    console.log("Existing Data:", existingData); // Log existing data for debugging

    // Save the current data in the history before updating
    existingData.history.push({
      updatedAt: new Date(),
      changes: {
        siteName: existingData.siteName,
        sourceDescription: existingData.sourceDescription,
        fuelType: existingData.fuelType,
        fuelState: existingData.fuelState,
        quantity: existingData.quantity,
        unit: existingData.unit,
      },
    });

    // Update with new data
    existingData.siteName = siteName;
    existingData.sourceDescription = sourceDescription;
    existingData.fuelType = fuelType;
    existingData.fuelState = fuelState;
    existingData.quantity = quantity;
    existingData.unit = unit;
    existingData.timestamp = new Date(); // Update timestamp

    // Save the updated entry
    await existingData.save();
    res.status(200).json({
      message: 'Data updated successfully',
      updatedEntry: existingData,
    });
  } catch (error) {
    console.error("Error updating data:", error); // Log the error for debugging
    res.status(500).json({ message: 'Error updating data', error: error.message || error });
  }
};
