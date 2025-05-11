const express = require('express');
const router = express.Router();
const { generateShorts } = require('../controller/shortsController');

router.post('/generate', generateShorts);

module.exports = router;
