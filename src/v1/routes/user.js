const express = require('express');
const userController = require('../controllers/user.js');
const router = express.Router();

router.route('/login/').post(userController.post_login);
router.route('/auth/').post(userController.post_auth);
router.route('/profile/').post(userController.post_profile);
router.route('/profile/').get(userController.get_profile);
router.route('/profile/').put(userController.put_profile);
router.route('/account/').post(userController.post_account);
router.route('/account/').get(userController.get_account);

module.exports = router;
