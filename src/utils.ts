import fs from 'fs';
import chalk, { ForegroundColor } from 'chalk';

export const deleteFolderRecursive: (path: string) => void = path => {
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

export interface LogConfig {
  blueBright: (key: string, value: string) => void;
  greenBright: (key: string, value: string) => void;
  redBright: (key: string, value: string) => void;
}

const Log = (): LogConfig => {
  const { log } = console;

  const print: (color: typeof ForegroundColor, key: string, value: string) => void = (color, key, value) => {
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

export default {
  deleteFolderRecursive,
  Log: Log(),
};
