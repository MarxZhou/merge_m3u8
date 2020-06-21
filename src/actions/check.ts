import fs from 'fs';

import { workDirectories } from '@/config';
import LoggerTool from '@/logger';
import chalk from 'chalk';

const label = 'check dictionaries';

const logger = new LoggerTool();

logger.setLabel(label);

export const checkDirectories = (): void => {
  logger.verbose('开始检查工作目录');
  logger.warn(chalk.redBright('备份和输出目录要求为空文件夹'));
  Object.entries(workDirectories).forEach(([key, value]) => {
    if (!fs.existsSync(value)) {
      if (workDirectories.inputPath === value) {
        logger.error(chalk.redBright('m3u8文件资源目录不存在，请重新配置'));
        throw new Error('m3u8文件目录不存在，请重新配置');
      }
      fs.mkdirSync(value);
      logger.info(`目录创建完成：${key}——${value}`, {
        [key]: value,
      });
    } else {
      logger.info(`目录已经存在：${key}——${value}`, {
        [key]: value,
      });

      if (workDirectories.inputPath !== value && fs.readdirSync(value).length) {
        logger.error(chalk.redBright(`目录：${key} 必须为空文件夹`));
        throw new Error(chalk.redBright(`目录：${key} 必须为空文件夹`));
      }
    }
  });
  logger.verbose('工作目录检查完成！！！');
};

export default checkDirectories;
