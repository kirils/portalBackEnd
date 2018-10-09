const express = require('express');
const router = express.Router(); 

router.get('/', (req, res) =>
  res.send('OK2')
);

module.exports = router;