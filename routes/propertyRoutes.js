const express = require('express');
const router = express.Router();
const { getPropertiesByLocation } = require('../controllers/propertyController');

router.get('/search', getPropertiesByLocation);

module.exports = router;
