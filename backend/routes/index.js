const express = require('express');
const router = express.Router();

router.use('/shorten',require('./shorten.routes'));
router.use('/:shortCode',require('./redirect.routes'))

module.exports = router;