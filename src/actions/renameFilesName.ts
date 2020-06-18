import { readM3u8Files } from '@/actions/readFiles';

import { rename } from '@/utils';

import LoggerTool from '@/logger';

const label = 'rename filename';

const logger = new LoggerTool();

logger.setLabel(label);

const dev = !!process.env.dev;

const m3u8files = readM3u8Files();

export const renameFilesName = (): void => {
  logger.warn('m3u8文件名中的非中英文字符将会被删除');

  m3u8files.forEach((value, index): void => {
    if (dev && index >= 1) {
      return;
    }
    rename(value);
  });

  logger.info('全部m3u8文件重命名完成！！！');
};

export default renameFilesName;
