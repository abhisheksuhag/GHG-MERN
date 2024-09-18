const MobileCombustion = require('../models/MobileCombustion');

exports.addMobileCombustion = async (req, res) => {
  const { userId, ...data } = req.body;

  try {
    const newEntry = new MobileCombustion({ userId, ...data });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: 'Error saving data', error: error.message });
  }
};

exports.finalSubmit = async (req, res) => {
  const { userId, data } = req.body;

  try {
    const results = await MobileCombustion.insertMany(data);
    res.status(200).json({ message: `${results.length} entries saved.` });
  } catch (error) {
    res.status(500).json({ message: 'Error during final submit', error: error.message });
  }
};
