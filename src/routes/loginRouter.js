const express = require('express');
const tokenGenerator = require('../utils/tokenGenerator');

const router = express();

router.post('/', (_req, res) => {
  const token = tokenGenerator();
  res.status(200).json({ token });
});

module.exports = router;