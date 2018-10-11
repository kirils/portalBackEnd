const express = require('express');
const securityCodeController = require('../controllers/snapShot.js');
const router = express.Router();

router.route('/:snapShot')
    /** GET /api/v1/snap-shot/:userName - Lookup a username in the snapshot */
    .get(snapShotController.lookup);

module.exports = router;