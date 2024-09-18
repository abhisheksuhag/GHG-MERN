// // SERVER/controllers/generalController.js
// const validation = require('../services/generalValidation');

// exports.addData = async (req, res) => {
//     const { category } = req.params;
//     const { userId, ...data } = req.body;

//     try {
//         const result = await validation.validateAndSaveData(category, userId, [data]);
//         if (result[0].success) {
//             res.status(result[0].created ? 201 : 200).json({
//                 message: result[0].created ? `New ${category} Data Added Successfully` : `${category} Data Updated Successfully`,
//                 entry: result[0].entry,
//             });
//         } else {
//             throw new Error(result[0].error);
//         }
//     } catch (error) {
//         console.error("Error adding/updating data:", error);
//         res.status(500).json({ message: 'Error processing data', error: error.message });
//     }
// };

// exports.getData = async (req, res) => {
//     const { category, userId } = req.params;

//     try {
//         const data = await validation.getDataForUser(category, userId);
//         res.status(200).json(data);
//     } catch (error) {
//         console.error("Error retrieving data:", error);
//         res.status(500).json({ message: 'Error retrieving data', error: error.message });
//     }
// };

// exports.updateData = async (req, res) => {
//     const { category, id } = req.params;
//     const updateData = req.body;

//     try {
//         const updatedEntry = await validation.updateEntry(category, id, updateData);
//         res.status(200).json({
//             message: 'Data updated successfully',
//             updatedEntry,
//         });
//     } catch (error) {
//         console.error("Error updating data:", error);
//         res.status(500).json({ message: 'Error updating data', error: error.message });
//     }
// };

// exports.deleteData = async (req, res) => {
//     const { category, id } = req.params;

//     try {
//         await validation.deleteEntry(category, id);
//         res.status(200).json({
//             message: 'Data deleted successfully',
//         });
//     } catch (error) {
//         console.error("Error deleting data:", error);
//         res.status(500).json({ message: 'Error deleting data', error: error.message });
//     }
// };

// exports.finalSubmit = async (req, res) => {
//     const { category } = req.params;
//     const { userId, data } = req.body;

//     try {
//         const results = await validation.validateAndSaveData(category, userId, data);
//         const successCount = results.filter((result) => result.success).length;
//         const failureCount = results.length - successCount;

//         res.status(200).json({
//             message: `Final submit successful. ${successCount} entries saved, ${failureCount} failures.`,
//         });
//     } catch (error) {
//         console.error('Error during final submit:', error);
//         res.status(500).json({ message: 'Error during final submit', error: error.message });
//     }
// };



const validation = require('../services/generalValidation');

// Add or update data for a specific category
exports.addOrUpdateData = async (req, res) => {
  const { category } = req.params;
  const { userId, ...data } = req.body;

  try {
    const result = await validation.validateAndSaveData(userId, category, [data]);
    if (result[0].success) {
      res.status(result[0].created ? 201 : 200).json({
        message: result[0].created ? 'Data added successfully' : 'Data updated successfully',
        entry: result[0].entry,
      });
    } else {
      throw new Error(result[0].error);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error processing data', error: error.message });
  }
};

// Get data for a specific user and category
exports.getData = async (req, res) => {
  const { category, userId } = req.params;

  try {
    const data = await validation.getDataForUser(userId, category);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving data', error: error.message });
  }
};

// Delete data entry
exports.deleteData = async (req, res) => {
  const { category, id } = req.params;

  try {
    await validation.deleteEntry(id, category);
    res.status(200).json({ message: 'Data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting data', error: error.message });
  }
};

exports.finalSubmit = async (req, res) => {
    const { userId, data, category } = req.body; // Ensure you're destructuring category from req.body

    try {
      if (!userId || !data || !category) {
        throw new Error('User ID, data, and category are required.');
      }

      const results = await validation.validateAndSaveData(userId, category, data);
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
