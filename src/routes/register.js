const express = require('express');
const router = express.Router(); 

router.get('/security-code', (req, res) =>
  res.send('OK')
);

module.exports = router;