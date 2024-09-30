const express = require('express');
const {
  addData,
  updateData,
  getData,
  deleteData,
  finalSubmit,
} = require('../controllers/generalController');

const router = express.Router();

// Add new data for a category (and optionally sectionType for multi-schema)
router.post('/:category/section/:sectionType?/add', addData);

// Update existing data for a category (and optionally sectionType for multi-schema)
router.put('/:category/section/:sectionType?/update/:id', updateData);

// Get data for a specific user and category (and optionally sectionType for multi-schema)
router.get('/:category/section/:sectionType?/:userId', getData);

// **Final submission for multiple entries in a category (and optionally sectionType for multi-schema)**
router.post('/:category/section/:sectionType?/final-submit', finalSubmit);

// Delete data entry for a category (and optionally sectionType for multi-schema)
router.delete('/:category/section/:sectionType?/delete/:id', deleteData);

module.exports = router;
