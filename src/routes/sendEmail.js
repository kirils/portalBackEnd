const express = require('express');
const sendEmailController = require('../controllers/sendEmail.js');
const router = express.Router();

router.route('/')
    /** GET /api/v1/send-email/hello@email.com - Send a welcome email */
    .get(sendEmailController.create);

module.exports = router;