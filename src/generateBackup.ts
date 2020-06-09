import fs from 'fs';

import { Log } from '@/utils';
import { workDirectories } from '@/config';
import { readM3u8Files } from '@/readFiles';

/**
 * 将m3u8文件进行备份。
 */
export const generateBackup = (): void => {
  const m3u8Files = readM3u8Files();

  Log.greenBright('备份文件开始创建');
  m3u8Files.forEach((value: string) => {
    try {
      fs.copyFileSync(`${workDirectories.inputPath}/${value}`, `${workDirectories.backupPath}/${value}`);

      Log.greenBright(`临时文件已创建：${value}`);
    } catch (e) {
      Log.redBright(`创建备份文件 ${value} 时出现了错误：`, `${JSON.stringify(e)}`);
    }
  });
  Log.greenBright('备份文件创建完成');
  Log.greenBright('========================================');
};

export default generateBackup;
