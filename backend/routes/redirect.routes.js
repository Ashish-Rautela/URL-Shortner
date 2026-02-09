const express = require('express');
const router = express.Router({ mergeParams: true });
const redirectController = require('../controller/redirect.controller');

router.get('/', redirectController);

module.exports = router;
