const express = require('express');
const { addMobileCombustion, finalSubmit } = require('../controllers/mobileCombustionController');
const router = express.Router();

router.post('/add', addMobileCombustion);
router.post('/final-submit', finalSubmit);

module.exports = router;
