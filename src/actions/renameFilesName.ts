import { readM3u8Files } from '@/actions/readFiles';

import { rename } from '@/utils';

import LoggerTool from '@/logger';

const label = 'rename filename';

const logger = new LoggerTool();

logger.setLabel(label);

const dev = !!process.env.dev;

export const renameFilesName = (): void => {
  logger.verbose('开始重命名m3u8文件');
  logger.warn('m3u8文件名中的只会保留英文字符、数字、下划线，其他字符将会被删除');

  const m3u8files = readM3u8Files();

  m3u8files.forEach((filename, index): void => {
    if (dev && index >= 1) {
      return;
    }
    rename(filename);
  });

  logger.verbose('全部m3u8文件重命名完成！！！');
};

export default renameFilesName;
