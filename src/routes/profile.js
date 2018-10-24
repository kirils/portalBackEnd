const express = require('express');
const profileController = require('../controllers/profile.js');
const router = express.Router();

router.route('/')
    /** GET /api/v1/profile/ - Post user dats */
    .get(profileController.create);



module.exports = router;