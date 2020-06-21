import fs from 'fs';
import path from 'path';

import omit from 'omit.js';

import Chance from 'chance';

import LoggerTool from '@/logger';
import { fileNameReg } from '@/utils/reg';
import { workDirectories } from '@/config';

const label = 'utils';

const logger = new LoggerTool();

logger.setLabel(label);

const chance = new Chance();

export const deleteFolderRecursive: (path: string) => void = currentPath => {
  logger.verbose(`准备删除目录：${path}`);
  if (fs.existsSync(currentPath)) {
    fs.readdirSync(currentPath).forEach((file: string) => {
      const curPath: string = currentPath + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(currentPath);
    logger.verbose('目录删除完成');
  }
  logger.verbose('目录不存在');
};

export const rename = (filename: string): void => {
  try {
    if (!fileNameReg.test(filename)) {
      return;
    }

    const newFilename = filename.replace(fileNameReg, '');

    let finalFilename = newFilename;

    if (fs.existsSync(path.join(workDirectories.inputPath, newFilename))) {
      finalFilename = `${chance.hash()}.m3u8`;
    }

    fs.renameSync(path.join(workDirectories.inputPath, filename), path.join(workDirectories.inputPath, finalFilename));
  } catch (error) {
    logger.error(`m3u8文件：${filename} 重命名失败，原因：${error}`, {
      filename,
      error: omit(error, ['output', 'stdout', 'stderr']),
    });
  }
};

export default {
  deleteFolderRecursive,
  rename,
};
