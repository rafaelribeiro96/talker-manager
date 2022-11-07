const fs = require('fs').promises;

const path = require('path');

const talkerFile = path.resolve(__dirname, '../talker.json');

const readFile = async () => {
  const fileJson = await fs.readFile(talkerFile, 'utf-8');
  return JSON.parse(fileJson);
};

const writeFile = async (data) => {
  await fs.writeFile(talkerFile, JSON.stringify(data));
};

const updateTalker = async (data, id) => {
  const talkers = await readFile();
  const index = talkers.findIndex((talker) => talker.id === id);
  talkers[index] = { id, ...data };
  const updateTalkers = JSON.stringify(talkers, null, 2);
  await fs.writeFile(path.join(__dirname, '../talker.json'), updateTalkers);
  return talkers[index];
};

const deleteTalker = async (id) => {
  const talkers = await readFile();
  const newTalkers = talkers.filter((talker) => talker.id !== Number(id));
  await writeFile(newTalkers);
};

module.exports = {
  readFile,
  writeFile,
  updateTalker,
  deleteTalker,
};