const express = require('express');
const kycController = require('../controllers/kyc.js');
const router = express.Router();

router.route('/applicant/').post(kycController.post_applicant);
router.route('/applicant/').get(kycController.get_applicant);

module.exports = router;
