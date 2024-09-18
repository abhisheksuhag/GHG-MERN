// // SERVER/services/generalValidation.js
// const mongoose = require('mongoose'); // Added mongoose import
// const models = {
//     StationaryCombustion: require('../models/StationaryCombustion'),
//     MobileCombustion: require('../models/MobileCombustion'),
//     // Add other models here as necessary
// };

// exports.validateAndSaveData = async (category, userId, data) => {
//     const Model = models[category]; // Dynamically load model

//     if (!Model || !userId || !data || data.length === 0) {
//         throw new Error('User ID and data are required or invalid category.');
//     }

//     const results = await Promise.all(data.map(async (entry) => {
//         try {
//             const existingEntry = await Model.findOne({ userId, sourceId: entry.sourceId });

//             if (existingEntry) {
//                 return await updateExistingEntry(existingEntry, entry);
//             } else {
//                 return await createNewEntry(userId, entry, Model);
//             }
//         } catch (error) {
//             console.error('Error processing entry:', error);
//             return { success: false, error: error.message };
//         }
//     }));

//     return results;
// };

// const updateExistingEntry = async (existingEntry, newData) => {
//     existingEntry.history.push({
//         updatedAt: new Date(),
//         changes: newData,
//     });

//     Object.assign(existingEntry, newData);

//     await existingEntry.save();
//     return { success: true, updated: true, entry: existingEntry };
// };

// const createNewEntry = async (userId, entryData, Model) => {
//     const newEntry = new Model({
//         ...entryData,
//         userId: mongoose.Types.ObjectId(userId), // Ensure ObjectId type for userId
//     });

//     await newEntry.save();
//     return { success: true, created: true, entry: newEntry };
// };

// exports.getDataForUser = async (category, userId) => {
//     const Model = models[category];
//     if (!Model) throw new Error('Invalid category');
//     return await Model.find({ userId });
// };

// exports.updateEntry = async (category, id, updateData) => {
//     const Model = models[category];
//     const existingData = await Model.findById(id);
//     if (!existingData) throw new Error('Data not found');

//     existingData.history.push({
//         updatedAt: new Date(),
//         changes: updateData,
//     });
//     Object.assign(existingData, updateData);
//     await existingData.save();
//     return existingData;
// };

// exports.deleteEntry = async (category, id) => {
//     const Model = models[category];
//     const result = await Model.findByIdAndDelete(id);
//     if (!result) throw new Error('Data not found');
//     return result;
// };




const mongoose = require('mongoose');
const categoryConfig = require('../config/categoryConfig');

// Map category name to its respective model
const categoryModelMap = categoryConfig.reduce((acc, { name, model }) => {
  acc[name] = require(`../models/${model}`);
  return acc;
}, {});

exports.validateAndSaveData = async (userId, category, data) => {
  if (!userId || !data || data.length === 0) {
    throw new Error('User ID and data are required.');
  }

  const model = categoryModelMap[category];
  if (!model) {
    throw new Error('Invalid category');
  }

  const results = await Promise.all(
    data.map(async (entry) => {
      try {
        const existingEntry = await model.findOne({ userId, sourceId: entry.sourceId });

        if (existingEntry) {
          return await updateExistingEntry(existingEntry, entry);
        } else {
          return await createNewEntry(userId, entry, model);
        }
      } catch (error) {
        return { success: false, error: error.message };
      }
    })
  );

  return results;
};

const updateExistingEntry = async (existingEntry, newData) => {
  existingEntry.history.push({
    updatedAt: new Date(),
    changes: { ...existingEntry.toObject() },
  });

  Object.assign(existingEntry, newData);
  await existingEntry.save();
  return { success: true, updated: true, entry: existingEntry };
};

const createNewEntry = async (userId, entryData, model) => {
  const newEntry = new model({ userId: mongoose.Types.ObjectId(userId), ...entryData });
  await newEntry.save();
  return { success: true, created: true, entry: newEntry };
};

exports.getDataForUser = async (userId, category) => {
  const model = categoryModelMap[category];
  if (!model) {
    throw new Error('Invalid category');
  }
  return await model.find({ userId });
};

exports.deleteEntry = async (id, category) => {
  const model = categoryModelMap[category];
  if (!model) {
    throw new Error('Invalid category');
  }
  await model.findByIdAndDelete(id);
};
