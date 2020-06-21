import fs from 'fs';
import path from 'path';

import omit from 'omit.js';

import { workDirectories, needRelativeBackupM3u8File } from '@/config';
import { pathReg } from '@/utils/reg';
import { readM3u8Files } from '@/actions/readFiles';

import LoggerTool from '@/logger';

const label = 'fix';

const logger = new LoggerTool();

logger.setLabel(label);

const dev = !!process.env.dev;

export const fix = (): void => {
  logger.verbose(`文件修复过程开始`);
  const m3u8files = readM3u8Files();

  m3u8files.forEach((filename, index) => {
    try {
      if (dev && index >= 1) {
        return;
      }

      const file = path.join(workDirectories.inputPath, filename);

      const data = fs.readFileSync(file, 'utf8');

      const fixedData = data.replace(pathReg, `${workDirectories.inputPath}/$2$3`);

      fs.writeFileSync(path.join(workDirectories.inputPath, filename), fixedData);

      if (needRelativeBackupM3u8File) {
        const fixedRelativeData = data.replace(pathReg, `./$2$3`);

        fs.writeFileSync(path.join(workDirectories.relativeBackupPath, filename), fixedRelativeData);
      }

      if (dev) {
        logger.info(`m3u8文件：${filename} 修复完成`, {
          filename,
        });
      }
    } catch (error) {
      logger.error(`m3u8文件：${filename} 修复失败，失败原因：${error}`, {
        filename,
        error: omit(error, ['output', 'stdout', 'stderr']),
      });
    }
  });

  logger.verbose(`全部m3u8文件修复完成！！！`);
};

export default fix;
