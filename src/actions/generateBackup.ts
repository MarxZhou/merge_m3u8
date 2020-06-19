import fs from 'fs';

import LoggerTool from '@/logger';

import { workDirectories } from '@/config';
import { readM3u8Files } from '@/actions/readFiles';

const label = 'generate backup';

const logger = new LoggerTool();

logger.setLabel(label);

/**
 * 将m3u8文件进行备份。
 */
export const generateBackup = (): void => {
  const { inputPath, backupPath } = workDirectories;
  logger.verbose('开始进行meu8文件的备份');
  logger.info(`资源目录：${inputPath}`, {
    inputPath,
  });
  logger.info(`备份目录：${backupPath}`, {
    backupPath,
  });
  const m3u8Files = readM3u8Files();

  m3u8Files.forEach((filename: string) => {
    try {
      fs.copyFileSync(`${inputPath}/${filename}`, `${backupPath}/${filename}`);
    } catch (error) {
      logger.error(`m3u8文件：${filename} 备份失败，失败原因：${error}`, {
        filename,
        error,
      });
    }
  });

  logger.verbose('备份过程结束！！！');
};

export default generateBackup;
