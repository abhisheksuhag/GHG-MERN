const mongoose = require('mongoose');
const categoryConfig = require('../config/categoryConfig');

// Dynamically map the categories to models
const categoryModelMap = categoryConfig.reduce((acc, { name, model, subSchemas }) => {
  const loadedModel = require(`../models/${model}`);

  acc[name] = {
    mainModel: loadedModel,  // For single schema categories
    subSchemas: subSchemas ? subSchemas.map(sub => loadedModel[sub]) : [], // Load sub-schemas from the main model file
  };

  return acc;
}, {});


// Helper function to dynamically convert data fields based on schema types
const convertDataTypes = (modelSchema, entryData) => {
  const schemaPaths = modelSchema.paths;
  const convertedData = { ...entryData };

  Object.keys(schemaPaths).forEach((field) => {
    const schemaType = schemaPaths[field].instance;
    if (schemaType === 'Number' && entryData[field] !== undefined) {
      convertedData[field] = Number(entryData[field]);
    }
  });

  return convertedData;
};


exports.validateAndSaveData = async (userId, category, data, sectionType = null) => {
  console.log('Entered validateAndSaveData function');
  console.log('UserId:', userId);
  console.log('Category:', category);
  console.log('Data:', data);
  console.log('SectionType:', sectionType);

  const categorySettings = categoryConfig.find(c => c.name === category);

  if (!categorySettings) {
    console.log('Invalid category:', category);
    throw new Error(`Invalid category: ${category}`);
  }

  console.log('Category Settings:', categorySettings);

  const model = categoryModelMap[category].mainModel;

  if (categorySettings.hasSubSchemas) {
    // Ensure sectionType is passed correctly and matches backend naming
    if (!sectionType) {
      console.log('Error: Section type is required for multi-schema categories');
      throw new Error('Section type is required for multi-schema categories');
    }

    console.log('Finding subSchema model for sectionType:', sectionType);

    // Ensure sectionType exactly matches the sub-schema modelName
    const subSchemaModel = categoryModelMap[category].subSchemas.find(schema => schema.modelName === sectionType);

    if (!subSchemaModel) {
      console.log('Invalid section type:', sectionType);
      throw new Error(`Invalid section type: ${sectionType}`);
    }

    console.log('SubSchema Model found:', subSchemaModel.modelName);

    const results = await Promise.all(
      data.map(async (entry) => {
        try {
          console.log('Processing entry:', entry);

          // Try to find an existing entry based on userId and sourceId
          const existingEntry = await subSchemaModel.findOne({ userId, sourceId: entry.sourceId });

          if (existingEntry) {
            console.log('Existing entry found:', existingEntry);

            // Append the changes to the history and update the entry
            existingEntry.history.push({ updatedAt: new Date(), changes: { ...existingEntry.toObject() } });
            Object.assign(existingEntry, convertDataTypes(subSchemaModel.schema, entry));
            await existingEntry.save();

            return { success: true, updated: true, entry: existingEntry };
          } else {
            console.log('Creating new entry:', entry);

            // Create a new entry if none exists
            const newEntry = new subSchemaModel({
              userId: new mongoose.Types.ObjectId(userId),
              ...convertDataTypes(subSchemaModel.schema, entry),
            });
            await newEntry.save();

            return { success: true, created: true, entry: newEntry };
          }
        } catch (error) {
          console.error('Error processing entry:', error);
          return { success: false, error: error.message };
        }
      })
    );

    return results;
  }

  // Handle single-schema categories
  console.log('Handling single-schema category');

  const results = await Promise.all(
    data.map(async (entry) => {
      try {
        console.log('Processing single-schema entry:', entry);

        if (!entry.sourceId) {
          console.error('Error: sourceId is missing in the entry:', entry);
          throw new Error('sourceId is required for each entry');
        }

        const existingEntry = await model.findOne({ userId, sourceId: entry.sourceId });

        if (existingEntry) {
          console.log('Existing entry found:', existingEntry);

          // Update the existing entry and add history
          existingEntry.history.push({
            updatedAt: new Date(),
            changes: { ...existingEntry.toObject() },
          });
          Object.assign(existingEntry, convertDataTypes(model.schema, entry));
          await existingEntry.save();

          return { success: true, updated: true, entry: existingEntry };
        } else {
          console.log('Creating new entry for single-schema category');

          const newEntry = new model({
            userId: new mongoose.Types.ObjectId(userId),
            ...convertDataTypes(model.schema, entry),
          });

          await newEntry.save();
          return { success: true, created: true, entry: newEntry };
        }
      } catch (error) {
        console.error('Error processing single-schema entry:', error);
        return { success: false, error: error.message };
      }
    })
  );

  return results;
};




// Get data for a specific user and category
exports.getDataForUser = async (userId, category, sectionType = null) => {
  const categorySettings = categoryConfig.find(c => c.name === category);

  if (!categorySettings) {
    throw new Error(`Invalid category: ${category}`);
  }

  const model = categoryModelMap[category].mainModel;

  // Handle multi-schema categories
  if (categorySettings.hasSubSchemas) {
    if (!sectionType) {
      throw new Error('Section type is required for multi-schema categories');
    }

    const subSchemaModel = categoryModelMap[category].subSchemas.find(schema => schema.modelName === sectionType);

    if (!subSchemaModel) {
      throw new Error('Invalid section type');
    }

    return await subSchemaModel.find({ userId });
  }

  // Handle single-schema categories
  return await model.find({ userId });
};

// Delete data entry
exports.deleteEntry = async (id, category, sectionType = null) => {
  const categorySettings = categoryConfig.find(c => c.name === category);

  if (!categorySettings) {
    throw new Error(`Invalid category: ${category}`);
  }

  const model = categoryModelMap[category].mainModel;

  // Handle multi-schema categories
  if (categorySettings.hasSubSchemas) {
    if (!sectionType) {
      throw new Error('Section type is required for multi-schema categories');
    }

    const subSchemaModel = categoryModelMap[category].subSchemas.find(schema => schema.modelName === sectionType);

    if (!subSchemaModel) {
      throw new Error('Invalid section type');
    }

    return await subSchemaModel.findByIdAndDelete(id);
  }

  // Handle single-schema categories
  return await model.findByIdAndDelete(id);
};

// Create new data entry
exports.createNewData = async (userId, category, entryData, sectionType = null) => {
  const categorySettings = categoryConfig.find(c => c.name === category);

  if (!categorySettings) {
    throw new Error(`Invalid category: ${category}`);
  }

  const model = categoryModelMap[category].mainModel;

  // Handle multi-schema categories
  if (categorySettings.hasSubSchemas) {
    if (!sectionType) {
      throw new Error('Section type is required for multi-schema categories');
    }

    const subSchemaModel = categoryModelMap[category].subSchemas.find(schema => schema.modelName === sectionType);

    if (!subSchemaModel) {
      throw new Error('Invalid section type');
    }

    const newEntry = new subSchemaModel({
      userId: new mongoose.Types.ObjectId(userId),
      ...convertDataTypes(subSchemaModel.schema, entryData),
    });

    await newEntry.save();
    return { success: true, created: true, entry: newEntry };
  }

  // Handle single-schema categories
  try {
    const newEntry = new model({
      userId: mongoose.Types.ObjectId(userId),
      ...convertDataTypes(model.schema, entryData),
    });
    await newEntry.save();
    return { success: true, created: true, entry: newEntry };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Update existing data entry
exports.updateExistingData = async (id, category, updateData, sectionType = null) => {
  const categorySettings = categoryConfig.find(c => c.name === category);

  if (!categorySettings) {
    throw new Error(`Invalid category: ${category}`);
  }

  const model = categoryModelMap[category].mainModel;

  // Handle multi-schema categories
  if (categorySettings.hasSubSchemas) {
    if (!sectionType) {
      throw new Error('Section type is required for multi-schema categories');
    }

    const subSchemaModel = categoryModelMap[category].subSchemas.find(schema => schema.modelName === sectionType);

    if (!subSchemaModel) {
      throw new Error('Invalid section type');
    }

    const existingEntry = await subSchemaModel.findOne({ sourceId: id });

    if (!existingEntry) {
      throw new Error('Entry not found');
    }

    existingEntry.history.push({
      updatedAt: new Date(),
      changes: { ...existingEntry.toObject() },
    });

    Object.assign(existingEntry, convertDataTypes(subSchemaModel.schema, updateData));
    await existingEntry.save();

    return { success: true, updated: true, entry: existingEntry };
  }

  // Handle single-schema categories
  try {
    const existingEntry = await model.findOne({ sourceId: id });
    if (!existingEntry) {
      throw new Error('Entry not found');
    }

    existingEntry.history.push({
      updatedAt: new Date(),
      changes: { ...existingEntry.toObject() },
    });

    Object.assign(existingEntry, convertDataTypes(model.schema, updateData));
    await existingEntry.save();

    return { success: true, updated: true, entry: existingEntry };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
