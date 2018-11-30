const express = require('express');
const validate = require('express-validation');
const userController = require('../controllers/user.js');
const router = express.Router();

const post_login = require('./validators/post_login.js');
const post_auth = require('./validators/post_auth.js');
const post_profile = require('./validators/post_profile.js');
const put_profile = require('./validators/put_profile.js');
const post_account = require('./validators/post_account.js');
const get_account = require('./validators/get_account.js');
const post_snapshot = require('./validators/post_snapshot.js');
const post_password = require('./validators/post_password.js');

router.route('/password/').post(validate(post_password.validate), userController.post_password);
router.route('/login/').post(validate(post_login.validate), userController.post_login);
router.route('/auth/').post(validate(post_auth.validate), userController.post_auth);
router.route('/profile/').post(validate(post_profile.validate), userController.post_profile);
router.route('/profile/').get(userController.get_profile);
router.route('/profile/').put(validate(put_profile.validate), userController.put_profile);
router.route('/account/').post(validate(post_account.validate), userController.post_account);
router.route('/account/').get(validate(get_account.validate), userController.get_account);
router.route('/snapshot/').get(validate(post_snapshot.validate), userController.post_snapshot);
router.route('/security/').get(userController.get_security);
router.route('/sharedrop/').get(userController.get_sharedrop);
router.route('/name/').get(userController.get_name);

module.exports = router;
