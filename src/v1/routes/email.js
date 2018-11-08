const express = require('express');
const validate = require('express-validation');
const emailController = require('../controllers/email.js');
const router = express.Router();

const post_authorize = require('./validators/post_authorize.js');
const post_welcome = require('./validators/post_welcome.js');
const post_reset = require('./validators/post_reset.js');
const post_add = require('./validators/post_add.js');

router.route('/authorize/').post(validate(post_authorize.validate), emailController.post_authorize);
router.route('/welcome/').post(validate(post_welcome.validate), emailController.post_welcome);
router.route('/reset/').post(validate(post_reset.validate), emailController.post_reset);
router.route('/add/').post(validate(post_add.validate), emailController.post_add);

module.exports = router;
