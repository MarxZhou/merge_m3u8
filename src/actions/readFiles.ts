import fs from 'fs';
import { workDirectories } from '@/config';

import LoggerTool from '@/logger';

const label = 'read files';

const logger = new LoggerTool();

logger.setLabel(label);

export const readM3u8Files = (): string[] => {
  logger.info('开始加载m3u8资源文件');
  const files = fs.readdirSync(workDirectories.inputPath).filter(value => value.endsWith('.m3u8'));
  logger.info('m3u8资源文件加载完成');
  return files;
};

export const readBackupFiles = (): string[] => {
  logger.info('开始加载m3u8备份文件');
  const files = fs.readdirSync(workDirectories.backupPath).filter(value => value.endsWith('.m3u8'));
  logger.info('m3u8备份文件读取完成');
  return files;
};

export default { readM3u8Files, readBackupFiles };
