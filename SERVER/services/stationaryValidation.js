const mongoose = require('mongoose');
const StationaryCombustion = require('../models/StationaryCombustion');

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
      sourceDescription: existingEntry.sourceDescription,
      area: existingEntry.area,
      fuelType: existingEntry.fuelType,
      fuelState: existingEntry.fuelState,
      quantity: existingEntry.quantity,
      unit: existingEntry.unit,
    },
  });

  Object.assign(existingEntry, {
    sourceDescription: newData.sourceDescription,
    area: Number(newData.area),
    fuelType: newData.fuelType,
    fuelState: newData.fuelState,
    quantity: Number(newData.quantity),
    unit: newData.unit,
  });

  await existingEntry.save();
  return { success: true, updated: true, entry: existingEntry };
};

const createNewEntry = async (userId, entryData) => {
  const newEntry = new StationaryCombustion({
    userId: new mongoose.Types.ObjectId(userId),
    sourceId: entryData.sourceId,
    siteName: entryData.siteName,
    sourceDescription: entryData.sourceDescription,
    area: Number(entryData.area),
    fuelType: entryData.fuelType,
    fuelState: entryData.fuelState,
    quantity: Number(entryData.quantity),
    unit: entryData.unit,
  });

  await newEntry.save();
  return { success: true, created: true, entry: newEntry };
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

exports.deleteEntry = async (id) => {
  const result = await StationaryCombustion.findByIdAndDelete(id);
  if (!result) {
    throw new Error('Data not found');
  }
  return result;
};
