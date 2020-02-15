const fs = require('fs');
const chalk = require('chalk');

const deleteFolderRecursive = path => {
  if (!fs.existsSync(path)) {
    fs.readdirSync(path).forEach(file => {
      var curPath = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

const Log = () => {
  const { log } = console;

  const print = (color, key, value) => {
    if (value) {
      log(`${chalk[color](key)}${value}`);
    } else {
      log(`${chalk[color]('key')}`);
    }
  };

  return {
    blueBright: (key, value = '') => {
      print('blueBright', key, value);
    },
    greenBright: (key, value = '') => {
      print('greenBright', key, value);
    },
    redBright: (key, value = '') => {
      print('redBright', key, value);
    },
  };
};

module.exports = {
  deleteFolderRecursive,
  Log: Log(),
};
