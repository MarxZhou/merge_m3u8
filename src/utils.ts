const fs = require('fs');
const chalk = require('chalk');

const deleteFolderRecursive: (path: string) => void = path => {
  if (!fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file: string) => {
      const curPath: string = path + '/' + file;
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

interface LogConfig {
  blueBright: (key: string, value: string) => void;
  greenBright: (key: string, value: string) => void;
  redBright: (key: string, value: string) => void;
}

const Log = (): LogConfig => {
  const { log } = console;

  const print: (color: string, key: string, value: string) => void = (color, key, value) => {
    log(`${chalk[color](key)}${value}`);
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

export default {};
