import path from 'path';
import child from 'child_process';

import omit from 'omit.js';
import chalk from 'chalk';

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

  logger.info(`${chalk.greenBright('任务总数：', m3u8files.length)}`);

  let current = 0;

  m3u8files.forEach(async (filename, index) => {
    let tempScript = '';
    try {
      if (dev && index >= 1) {
        return;
      }

      const file = path.join(inputPath, filename);

      const outputFile = path.join(outputPath, filename.replace('.m3u8', `.${outputFileExtension}`));

      const script = `ffmpeg -allowed_extensions ALL -i ${file} ${outputFile} -loglevel ${dev ? 'warning' : 'quiet'}`;

      tempScript = script;

      logger.verbose(`m3u8文件：${filename} 进入转换任务队列`, {
        filename,
        script,
      });

      const cp = child.exec(script, {
        cwd: workDirectories.inputPath,
        maxBuffer: Math.pow(1024, 10),
      });

      cp.on('exit', (): void => {
        current += 1;

        logger.info(`${chalk.blueBright('当前任务进度')}：${chalk.greenBright(`${current}/${m3u8files.length}`)}`);

        logger.info(`m3u8文件：${filename} 转换完成`);

        if (current === m3u8files.length) {
          logger.info(`恭喜你，全部m3u8文件转换完成！！！`);
        }
      });

      cp.on('error', (error): void => {
        logger.error(
          `m3u8文件：${filename} 转换失败，${chalk.redBright(
            '请手动检查m3u8文件对应的资源目录是否存在！'
          )}失败原因：${error}`,
          {
            filename,
            error,
            script: tempScript,
          }
        );
      });
    } catch (error) {
      logger.error(
        `m3u8文件：${filename} 转换失败，${chalk.redBright(
          '请手动检查m3u8文件对应的资源目录是否存在！'
        )}失败原因：${error}`,
        {
          filename,
          error: omit(error, ['output', 'stdout', 'stderr']),
          script: tempScript,
        }
      );
    }
  });

  logger.verbose(`开始转换，请耐心等待！！！`);
};

export default convert;
