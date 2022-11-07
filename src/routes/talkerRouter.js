const express = require('express');

const { readFile } = require('../utils/readFile');

const talkerRouter = express();

talkerRouter.get('/', async (_res, req) => 
req.status(200).json(await readFile()));

module.exports = talkerRouter;