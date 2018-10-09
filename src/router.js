const express = require('express');
const registerRoutes = require('./routes/register.js');
const securityCodeRoutes = require('./routes/securityCode.js');
const router = express.Router();

router.get('/', (req, res) =>
  res.send('OK')
);

router.use('/register', registerRoutes);
router.use('/security-code', securityCodeRoutes);

module.exports = router;