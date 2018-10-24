const express = require('express');
const loginController = require('../controllers/login.js');
const router = express.Router();

router.route('/')
    /** GET /api/v1/login - log a user in */
    .get(loginController.check);

module.exports = router;