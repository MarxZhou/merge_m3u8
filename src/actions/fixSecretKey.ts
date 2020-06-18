import fs from 'fs';

import { workDirectories } from '@/config';
import { keyReg } from '@/utils/reg';
import { Log } from '@/utils';

import { readBackupFiles } from '@/actions/readFiles';

/**
 * 如果视频文件被加密，则修正密钥的加载路径
 */
export const fixSecretKey = (): void => {
  const tempM3u8Files = readBackupFiles();

  tempM3u8Files.forEach((value: string) => {
    try {
      // 获取当前m3u8文件
      const m3u8File: string = fs.readFileSync(`${workDirectories.backupPath}/${value}`, 'utf8');

      // 判断是否加密
      const isEncrypted: RegExpMatchArray | null = m3u8File.match(keyReg);

      if (isEncrypted) {
        // 如果加密，则处理密钥的路径
        const keyUri: string = isEncrypted[1];

        const newM3u8File: string = m3u8File.replace(keyUri, workDirectories.inputPath);

        const tempFile: string = `${workDirectories.backupPath}/${value}`;

        fs.writeFileSync(tempFile, newM3u8File);

        Log.greenBright('文件密钥信息修正完成：', value);
      } else {
        // 如果加密，输出日志
        Log.greenBright('文件未加密：', value);
      }
    } catch (e) {
      Log.redBright('密钥路径修正过程出现了错误：', `${value}：${JSON.stringify(e)}`);
    }
  });
};

export default fixSecretKey;
