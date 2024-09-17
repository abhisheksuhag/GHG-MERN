// const StationaryCombustion = require('../models/StationaryCombustion');
// const mongoose = require('mongoose');

// // Service: Add or Update Stationary Combustion Data
// const addStationaryCombustionService = async (data) => {
//   const { userId, siteName, sourceDescription, fuelType, fuelState, quantity, unit } = data;

//   if (!userId || !siteName || !sourceDescription || !fuelType || !fuelState || !quantity || !unit) {
//     throw new Error('Missing required fields');
//   }

//   const existingEntry = await StationaryCombustion.findOne({ userId, siteName });

//   if (existingEntry) {
//     existingEntry.history.push({
//       updatedAt: new Date(),
//       changes: { sourceDescription, fuelType, fuelState, quantity, unit }
//     });
//     Object.assign(existingEntry, { sourceDescription, fuelType, fuelState, quantity, unit, timestamp: new Date() });

//     await existingEntry.save();
//     return { message: 'Data Updated Successfully', updatedEntry: existingEntry };
//   }

//   const newEntry = new StationaryCombustion({
//     userId,
//     sourceId: `${siteName}-${Date.now()}`,
//     siteName,
//     sourceDescription,
//     fuelType,
//     fuelState,
//     quantity,
//     unit,
//     timestamp: new Date()
//   });

//   await newEntry.save();
//   return { message: 'Data Added Successfully', newEntry };
// };

// // Service: Get Stationary Combustion Data
// const getStationaryCombustionDataService = async (userId) => {
//   const data = await StationaryCombustion.find({ userId });
//   return data;
// };

// // Service: Update Stationary Combustion Data
// const updateStationaryCombustionService = async (id, data) => {
//   const existingData = await StationaryCombustion.findById(id);
//   if (!existingData) {
//     throw new Error('Data not found');
//   }

//   existingData.history.push({
//     updatedAt: new Date(),
//     changes: {
//       siteName: existingData.siteName,
//       sourceDescription: existingData.sourceDescription,
//       fuelType: existingData.fuelType,
//       fuelState: existingData.fuelState,
//       quantity: existingData.quantity,
//       unit: existingData.unit,
//     }
//   });

//   Object.assign(existingData, { ...data, timestamp: new Date() });

//   await existingData.save();
//   return { message: 'Data updated successfully', updatedEntry: existingData };
// };

// // Service: Final Submit of Stationary Combustion Data
// const finalSubmitStationaryCombustionService = async ({ userId, data }) => {
//   console.log("UserID:", userId); // Log userId for debugging
//   console.log("Data being submitted:", data); // Log data for debugging

//   if (!userId || !data || data.length === 0) {
//     throw new Error('User ID and data are required.');
//   }

//   try {
//     const promises = data.map(async (entry) => {
//       console.log("Processing entry:", entry); // Log each entry for debugging

//       const existingEntry = await StationaryCombustion.findOne({ userId, sourceId: entry.sourceId });

//       if (existingEntry) {
//         console.log("Existing entry found, updating:", existingEntry);

//         try {
//           // Add to history
//           existingEntry.history.push({
//             updatedAt: new Date(),
//             changes: {
//               siteName: existingEntry.siteName,
//               sourceDescription: existingEntry.sourceDescription,
//               fuelType: existingEntry.fuelType,
//               fuelState: existingEntry.fuelState,
//               quantity: existingEntry.quantity,
//               unit: existingEntry.unit,
//             }
//           });

//           // Update the existing entry with new data
//           Object.assign(existingEntry, entry);

//           await existingEntry.save();
//           return { success: true, updated: true };

//         } catch (err) {
//           // Handle VersionError specifically
//           if (err.name === 'VersionError') {
//             console.error('Version conflict detected, retrying...');
//             return { success: false, error: 'Version conflict, retry required' };
//           }

//           throw err; // Rethrow error for non-version related issues
//         }

//       } else {
//         console.log("No existing entry, creating new entry");
//         const newEntry = new StationaryCombustion({
//           ...entry,
//           userId: new mongoose.Types.ObjectId(userId),
//           timestamp: new Date(),
//         });

//         await newEntry.save();
//         return { success: true, created: true };
//       }
//     });

//     const results = await Promise.all(promises);
//     const successCount = results.filter((result) => result.success).length;
//     const failureCount = results.length - successCount;

//     console.log(`Final submit: ${successCount} successes, ${failureCount} failures`);
//     return { message: `Final submit successful. ${successCount} entries saved, ${failureCount} failures.` };
//   } catch (error) {
//     console.error('Error during final submit:', error);
//     throw new Error(error.message);
//   }
// };


// module.exports = {
//   addStationaryCombustionService,
//   getStationaryCombustionDataService,
//   updateStationaryCombustionService,
//   finalSubmitStationaryCombustionService,
// };





const mongoose = require('mongoose');
const StationaryCombustion = require('../models/StationaryCombustion');
const { generateSourceId } = require('../utils/helpers');

exports.validateAndSaveData = async (userId, data) => {
  if (!userId || !data || data.length === 0) {
    throw new Error('User ID and data are required.');
  }

  const results = await Promise.all(data.map(async (entry) => {
    try {
      const existingEntry = await StationaryCombustion.findOne({ userId, sourceId: entry.sourceId });

      if (existingEntry) {
        return await updateExistingEntry(existingEntry, entry);
      } else {
        return await createNewEntry(userId, entry);
      }
    } catch (error) {
      console.error('Error processing entry:', error);
      return { success: false, error: error.message };
    }
  }));

  return results;
};

const updateExistingEntry = async (existingEntry, newData) => {
  existingEntry.history.push({
    updatedAt: new Date(),
    changes: {
      siteName: existingEntry.siteName,
      sourceDescription: existingEntry.sourceDescription,
      area: existingEntry.area,
      fuelType: existingEntry.fuelType,
      fuelState: existingEntry.fuelState,
      quantity: existingEntry.quantity,
      unit: existingEntry.unit,
    },
  });

  Object.assign(existingEntry, {
    siteName: newData.siteName,
    sourceDescription: newData.sourceDescription,
    area: Number(newData.area),
    fuelType: newData.fuelType,
    fuelState: newData.fuelState,
    quantity: Number(newData.quantity),
    unit: newData.unit,
  });

  await existingEntry.save();
  return { success: true, updated: true };
};

const createNewEntry = async (userId, entryData) => {
  const newEntry = new StationaryCombustion({
    userId: new mongoose.Types.ObjectId(userId),
    sourceId: entryData.sourceId || generateSourceId(entryData.siteName),
    siteName: entryData.siteName,
    sourceDescription: entryData.sourceDescription,
    area: Number(entryData.area),
    fuelType: entryData.fuelType,
    fuelState: entryData.fuelState,
    quantity: Number(entryData.quantity),
    unit: entryData.unit,
  });

  await newEntry.save();
  return { success: true, created: true };
};

exports.getDataForUser = async (userId) => {
  return await StationaryCombustion.find({ userId });
};

exports.updateEntry = async (id, updateData) => {
  const existingData = await StationaryCombustion.findById(id);
  if (!existingData) {
    throw new Error('Data not found');
  }

  existingData.history.push({
    updatedAt: new Date(),
    changes: {
      siteName: existingData.siteName,
      sourceDescription: existingData.sourceDescription,
      area: existingData.area,
      fuelType: existingData.fuelType,
      fuelState: existingData.fuelState,
      quantity: existingData.quantity,
      unit: existingData.unit,
    },
  });

  Object.assign(existingData, updateData, { timestamp: new Date() });
  await existingData.save();
  return existingData;
};