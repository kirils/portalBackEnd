const express = require('express');
const emailRoutes = require('./v1/routes/email.js');
const userRoutes = require('./v1/routes/user.js');
const kycRoutes = require('./v1/routes/kyc.js');
const router = express.Router();

router.use('/api/v1/email', emailRoutes);
router.use('/api/v1/user', userRoutes);
router.use('/api/v1/kyc', kycRoutes);

module.exports = router;