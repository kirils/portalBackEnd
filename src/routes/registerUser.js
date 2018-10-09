const express = require('express');
const registerUserController = require('../controllers/registerUser.js');
const router = express.Router();

router.route('/')
    /** POST /api/v1/register-user - Create a new user */
    .post(registerUserController.create);


module.exports = router;