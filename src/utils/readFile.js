const fs = require('fs').promises;

const path = require('path');

const readFile = async () => {
  const fileJson = await fs.readFile(path.join(__dirname, '../talker.json'), 'utf-8');
  return JSON.parse(fileJson);
};

module.exports = {
  readFile,
};