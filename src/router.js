const express = require('express');
const registerUserRoutes = require('./routes/registerUser.js');
const securityCodeRoutes = require('./routes/securityCode.js');
const router = express.Router();

router.get('/', (req, res) =>
  res.json({
    api_version: '1',
    location: '/',
    server_time: new Date().getTime(),
    endpoints: {
      '/register' : 'register a new worbli account',
      '/security-code/' : 'Create a new security code',
      '/security-code/8945830948594850450123' : 'Lookup a security code'
    }
  })
);

router.use('/register-user', registerUserRoutes);
router.use('/security-code', securityCodeRoutes);

module.exports = router;