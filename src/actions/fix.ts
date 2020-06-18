import readline from 'readline';
import fs from 'fs';
import path from 'path';
import events from 'events';

import { workDirectories } from '@/config';
// import { keyReg } from '@/utils/reg';
import { readM3u8Files } from '@/actions/readFiles';

import LoggerTool from '@/logger';

const label = 'fix';

const logger = new LoggerTool();

logger.setLabel(label);

const dev = !!process.env.dev;

const processLineByLine = async (filename: string) => {
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(path.join(workDirectories.inputPath, filename)),
      crlfDelay: Infinity,
    });

    rl.on('line', (/*input*/) => {
      // console.log(`input:`, input);
    });

    await events.once(rl, 'close');

    logger.info(`m3u8文件：${filename}修复完成`);
  } catch (e) {
    logger.info(`修复文件${filename}失败，失败原因：${JSON.stringify(e)}`);
  }
};

export const fix = (): void => {
  const m3u8files = readM3u8Files();
  logger.info(`文件修复过程开始`);

  m3u8files.forEach(async (value, index) => {
    if (dev && index >= 1) {
      return;
    }

    await processLineByLine(value);
  });

  logger.info(`全部m3u8文件修复完成`);
};

export default fix;
