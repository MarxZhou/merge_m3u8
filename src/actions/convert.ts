import path from 'path';
import child from 'child_process';

import { outputFileExtension, workDirectories } from '@/config';
import { readM3u8Files } from '@/actions/readFiles';

import LoggerTool from '@/logger';

const label = 'convert';

const logger = new LoggerTool();

logger.setLabel(label);

const dev = !!process.env.dev;

export const convert = (): void => {
  const { inputPath, outputPath } = workDirectories;
  const m3u8files = readM3u8Files();
  logger.verbose(`文件修复过程开始`);

  m3u8files.forEach(async (filename, index) => {
    let tempScript = '';
    try {
      if (dev && index >= 1) {
        return;
      }

      const file = path.join(inputPath, filename);

      const outputFile = path.join(outputPath, filename.replace('.m3u8', `.${outputFileExtension}`));

      const script = `ffmpeg -allowed_extensions ALL -i ${file} ${outputFile} ${!dev ? '-loglevel quiet' : ''}`;

      tempScript = script;

      logger.verbose(`m3u8文件：${filename} 开始转换`, {
        filename,
        script,
      });

      child.execSync(script);

      logger.info(`m3u8文件：${filename} 转换完成`, {
        filename,
        script,
      });
    } catch (error) {
      logger.error(`m3u8文件：${filename} 转换失败，失败原因：${error}`, {
        filename,
        error,
        script: tempScript,
      });
    }
  });

  logger.verbose(`全部m3u8文件转换完成！！！`);
};

export default convert;
