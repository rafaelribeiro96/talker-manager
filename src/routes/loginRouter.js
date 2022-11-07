const express = require('express');
const tokenGenerator = require('../utils/tokenGenerator');
const { validateEmail, validatePassword } = require('../middlewares/validateLogin');

const router = express();

router.post('/',
  validateEmail,
  validatePassword,
   (_req, res) => {
  const token = tokenGenerator();
  res.status(200).json({ token });
});

module.exports = router;