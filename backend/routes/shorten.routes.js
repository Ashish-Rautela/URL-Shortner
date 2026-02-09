const express = require('express');
const router = express.Router();
const shortenController = require('../controller/shorten.controller');

router.post('/',shortenController);

module.exports = router;