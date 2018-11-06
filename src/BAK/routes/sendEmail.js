const express = require('express');
const sendEmailController = require('../controllers/sendEmail.js');
const router = express.Router();

router.route('/validate/:email')
    /** GET /api/v1/send-email/validate/hello@email.com - Send a welcome email */
    .get(sendEmailController.validate);

router.route('/welcome/:email')
    /** GET /api/v1/send-email/welcome/hello@email.com - Send a welcome email */
    .get(sendEmailController.welcome);

module.exports = router;