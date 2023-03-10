const express = require('express');

const { readFile, writeFile, updateTalker, deleteTalker } = require('../utils/helpers');

const ageValidate = require('../middlewares/ageValidate');
const nameValidate = require('../middlewares/nameValidate');
const rateValidate = require('../middlewares/rateValidate');
const talkerValidate = require('../middlewares/talkerValidate');
const tokenValidate = require('../middlewares/tokenValidate');
const watchedAtValidate = require('../middlewares/watchedAtValidate');

const talkerRouter = express();

talkerRouter.get('/', async (_req, res) => 
res.status(200).json(await readFile()));

talkerRouter.get('/search',
tokenValidate, 
async (req, res) => {
  const { q } = req.query;
  const talkers = await readFile();
  const talkerFilter = talkers.filter((talker) => talker.name.includes(q));
  res.status(200).json(talkerFilter);
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const dataFile = await readFile();
  const [talkerFilter] = dataFile.filter((talker) => talker.id === Number(id));
  
  if (talkerFilter) {
    return res.status(200).json(talkerFilter);
  }
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

talkerRouter.post('/',
  tokenValidate,
  nameValidate,
  ageValidate,  
  talkerValidate,
  watchedAtValidate,
  rateValidate,
  async (req, res) => {
  const talkers = await readFile();
  const id = talkers ? talkers[talkers.length - 1].id + 1 : 1;
  const newTalker = { ...req.body, id };
  talkers.push(newTalker);
  await writeFile(talkers);
  res.status(201).json(newTalker);
});

talkerRouter.put('/:id',
tokenValidate,
  nameValidate,
  ageValidate,  
  talkerValidate,
  watchedAtValidate,
  rateValidate,
   async (req, res) => {
  const { id } = req.params;
  const edited = await updateTalker(req.body, Number(id));
  res.status(200).json(edited);
});

talkerRouter.delete('/:id',
tokenValidate,
async (req, res) => {
  const { id } = req.params;
  await deleteTalker(id);
  res.status(204).end();
});

module.exports = talkerRouter;