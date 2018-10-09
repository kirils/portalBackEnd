const express = require('express');
const securityCode = require('../controllers/securityCode.js');
const router = express.Router();

router.route('/')
    /** GET /api/v1/security-code - Get a security code */
    .get(securityCode.create);

router.route('/:securityCode')
    /** GET /api/v1/security-code/:securityCode - Lookup a security code */
    .get(securityCode.lookup);

module.exports = router;