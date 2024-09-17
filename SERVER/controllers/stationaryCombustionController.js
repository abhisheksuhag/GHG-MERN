const validation = require('../services/stationaryValidation');

exports.addStationaryCombustion = async (req, res) => {
  const { userId, ...data } = req.body;

  try {
    const result = await validation.validateAndSaveData(userId, [data]);
    if (result[0].success) {
      res.status(result[0].created ? 201 : 200).json({
        message: result[0].created ? 'New Stationary Combustion Data Added Successfully' : 'Stationary Combustion Data Updated Successfully',
        entry: result[0].entry,
      });
    } else {
      throw new Error(result[0].error);
    }
  } catch (error) {
    console.error("Error adding/updating data:", error);
    res.status(500).json({ message: 'Error processing data', error: error.message });
  }
};

exports.getStationaryCombustionData = async (req, res) => {
  const { userId } = req.params;

  try {
    const data = await validation.getDataForUser(userId);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ message: 'Error retrieving data', error: error.message });
  }
};
exports.updateStationaryCombustion = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedEntry = await validation.updateEntry(id, updateData);
    res.status(200).json({
      message: 'Data updated successfully',
      updatedEntry,
    });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ message: 'Error updating data', error: error.message });
  }
};

exports.deleteStationaryCombustion = async (req, res) => {
  const { id } = req.params;

  try {
    await validation.deleteEntry(id);
    res.status(200).json({
      message: 'Data deleted successfully',
    });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({ message: 'Error deleting data', error: error.message });
  }
};

exports.finalSubmit = async (req, res) => {
  const { userId, data } = req.body;

  try {
    const results = await validation.validateAndSaveData(userId, data);
    const successCount = results.filter((result) => result.success).length;
    const failureCount = results.length - successCount;

    res.status(200).json({
      message: `Final submit successful. ${successCount} entries saved, ${failureCount} failures.`,
    });
  } catch (error) {
    console.error('Error during final submit:', error);
    res.status(500).json({ message: 'Error during final submit', error: error.message });
  }
};