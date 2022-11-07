const express = require('express');
const tokenGenerator = require('../utils/tokenGenerator');
const { emailValidate, passwordValidate } = require('../middlewares/loginValidate');

const router = express();

router.post('/',
emailValidate,
passwordValidate,
   (_req, res) => {
  const token = tokenGenerator();
  res.status(200).json({ token });
});

module.exports = router;