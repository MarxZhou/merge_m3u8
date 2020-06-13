import fs from 'fs';

import { workDirectories } from '@/config';
import { Log } from '@/utils';

export const checkDirectories = (): void =>
  Object.entries(workDirectories).forEach(([key, value]) => {
    if (!fs.existsSync(value)) {
      if (workDirectories.inputPath === value) {
        Log.redBright(`m3u8文件目录不存在，请重新配置`);
        throw new Error('m3u8文件目录不存在，请重新配置');
      }
      fs.mkdirSync(value);
      Log.greenBright(`工作目录${key}创建完成：`, value);
    } else {
      Log.greenBright(`工作目录${key}已存在：`, value);
    }
  });
