const validation = require('../services/generalValidation');
const categoryConfig = require('../config/categoryConfig');

// Add new data for a specific category and section type (if applicable)
exports.addData = async (req, res) => {
  const { category, sectionType } = req.params;
  const { userId, ...data } = req.body;

  try {
    const result = await validation.createNewData(userId, category, data, sectionType);
    if (result.success) {
      res.status(201).json({
        message: 'Data added successfully',
        entry: result.entry,
      });
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error processing data', error: error.message });
  }
};

// Update existing data for a specific category and section type (if applicable)
exports.updateData = async (req, res) => {
  const { category, id, sectionType } = req.params;
  const updateData = req.body;

  try {
    const result = await validation.updateExistingData(id, category, updateData, sectionType);
    if (result.success) {
      res.status(200).json({
        message: 'Data updated successfully',
        entry: result.entry,
      });
    } else {
      throw new Error(result.error);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error processing data', error: error.message });
  }
};

// Get data for a specific user and category
exports.getData = async (req, res) => {
  const { userId, category, sectionType } = req.params;

  try {
    const data = await validation.getDataForUser(userId, category, sectionType);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data', error: error.message });
  }
};


// Final submission for multiple entries in a category (and optionally sectionType for multi-schema)
exports.finalSubmit = async (req, res) => {
  // Retrieve category and sectionType from req.params
  const { category, sectionType } = req.params;
  const { userId, data } = req.body;

  try {
    // Find the category settings from categoryConfig
    const categorySettings = categoryConfig.find(c => c.name === category);

    // Check if it's a multi-sub-schema category and if sectionType is required
    if (categorySettings.hasSubSchemas && !sectionType) {
      throw new Error('Section type is required for multi-sub-schema categories');
    }

    // Call validation service to handle final submission for multi-schema or single-schema categories
    const results = await validation.validateAndSaveData(userId, category, data, sectionType);
    const successCount = results.filter((result) => result.success).length;
    const failureCount = results.length - successCount;

    // Respond with success message
    res.status(200).json({
      message: `Final submit successful. ${successCount} entries saved, ${failureCount} failures.`,
    });
  } catch (error) {
    console.error('Error during final submit:', error);
    res.status(500).json({ message: 'Error during final submit', error: error.message });
  }
};

// Delete data entry
exports.deleteData = async (req, res) => {
  const { category, id, sectionType } = req.params;

  try {
    await validation.deleteEntry(id, category, sectionType);
    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting data', error: error.message });
  }
};
