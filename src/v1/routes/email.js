const express = require('express');
const emailController = require('../controllers/email.js');
const router = express.Router();

router.route('/authorize/').post(emailController.post_authorize);
router.route('/welcome/').post(emailController.post_welcome);
router.route('/reset/').post(emailController.post_reset);
router.route('/add/').post(emailController.post_add);

module.exports = router;
