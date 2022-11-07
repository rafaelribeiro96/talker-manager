const express = require('express');

const { readFile } = require('../utils/readFile');

const talkerRouter = express();

talkerRouter.get('/', async (_req, res) => 
res.status(200).json(await readFile()));

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const dataFile = await readFile();
  const [talkerFilter] = dataFile.filter((talker) => talker.id === Number(id));
  
  if (talkerFilter) {
    return res.status(200).json(talkerFilter);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = talkerRouter;