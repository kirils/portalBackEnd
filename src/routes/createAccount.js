const express = require('express');
const createAccountController = require('../controllers/createAccount.js');
const router = express.Router();

router.route('/')
    /** POST /api/v1/create-account/ - Create a worbli acount with worbliAccountName */
    .post(createAccountController.create);

module.exports = router;