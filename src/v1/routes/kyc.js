const express = require('express');
const validate = require('express-validation');
const kycController = require('../controllers/kyc.js');
const router = express.Router();

const post_applicant = require('./validators/post_applicant.js');
const get_applicant = require('./validators/get_applicant.js');

router.route('/applicant/').post(validate(post_applicant.validate), kycController.post_applicant);
router.route('/applicant/').get(validate(get_applicant.validate), kycController.get_applicant);

module.exports = router;
