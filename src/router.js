const express = require('express');
const emailRoutes = require('./v1/routes/email.js');
const userRoutes = require('./v1/routes/user.js');
const kycRoutes = require('./v1/routes/kyc.js');
const loggerRoutes = require('./v1/routes/logger.js');
const router = express.Router();

router.use('/api/v1/email', emailRoutes);
router.use('/api/v1/user', userRoutes);
router.use('/api/v1/kyc', kycRoutes);
router.use('/api/v1/logger', loggerRoutes);

module.exports = router;