const express = require('express');
const authRoutes = require('register.js');
const router = express.Router();

router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/register', authRoutes);

module.exports = router;