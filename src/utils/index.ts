import fs from 'fs';
import path from 'path';

import Chance from 'chance';

import LoggerTool from '@/logger';
import { fileNameReg } from '@/utils/reg';
import { workDirectories } from '@/config';

const label = 'utils';

const logger = new LoggerTool();

logger.setLabel(label);

const chance = new Chance();

export const deleteFolderRecursive: (path: string) => void = currentPath => {
  logger.info('准备删除备份目录和文件');
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
    logger.info('备份目录和文件删除完成');
  }
  logger.info('备份目录不存在');
};

export const rename = (filename: string): void => {
  try {
    const newFilename = filename.replace(fileNameReg, '');

    let finalFilename = newFilename;

    if (fs.existsSync(path.join(workDirectories.inputPath, newFilename))) {
      finalFilename = chance.hash();
    }

    fs.renameSync(path.join(workDirectories.inputPath, filename), path.join(workDirectories.inputPath, finalFilename));
  } catch (e) {
    logger.error(`m3u8文件：${filename}重命名失败，原因：${JSON.stringify(e)}`);
  }
};

export default {
  deleteFolderRecursive,
  rename,
};
