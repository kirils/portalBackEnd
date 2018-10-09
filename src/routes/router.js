const express = require('express');
const registerRoutes = require('./register.js');
const router = express.Router();

router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/register', registerRoutes);

module.exports = router;