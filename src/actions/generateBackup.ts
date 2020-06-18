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
  logger.info('开始进行meu8文件的备份');
  logger.info(`资源目录：${workDirectories.inputPath}`);
  logger.info(`备份目录：${workDirectories.backupPath}`);
  const m3u8Files = readM3u8Files();

  m3u8Files.forEach((value: string) => {
    try {
      fs.copyFileSync(`${workDirectories.inputPath}/${value}`, `${workDirectories.backupPath}/${value}`);
    } catch (e) {
      logger.error(`m3u8文件：${value}备份失败，失败原因：${JSON.stringify(e)}`);
    }
  });

  logger.info('备份过程结束！！！');
};

export default generateBackup;
