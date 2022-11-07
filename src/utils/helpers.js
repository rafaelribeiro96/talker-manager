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

module.exports = {
  readFile,
  writeFile,
};