// // SERVER/routes/generalRoutes.js
// const express = require('express');
// const {
//     addData,
//     getData,
//     updateData,
//     deleteData,
//     finalSubmit
// } = require('../controllers/generalController');

// const router = express.Router();

// // Add new data
// router.post('/add', addData);

// // Final submission: create new entries or update existing ones
// router.post('/final-submit', finalSubmit);

// // Get data for a user
// router.get('/:userId', getData);

// // Update existing data
// router.put('/update/:id', updateData);

// // Delete existing data
// router.delete('/delete/:id', deleteData);

// module.exports = router;



const express = require('express');
const {
  addOrUpdateData,
  getData,
  deleteData,
  finalSubmit,
} = require('../controllers/generalController');

const router = express.Router();

// Add or update data
router.post('/:category/add', addOrUpdateData);

// Get data for a specific user and category
router.get('/:category/:userId', getData);

// Final submission for multiple entries
router.post('/:category/final-submit', finalSubmit);

// Delete data
router.delete('/:category/delete/:id', deleteData);

module.exports = router;
