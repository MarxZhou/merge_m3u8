import LoggerTool from '@/logger';

import { workDirectories, saveBackupM3u8File, enableConvert } from '@/config';

import { deleteFolderRecursive } from '@/utils';

import checkDirectories from '@/actions/check';
import generateBackup from '@/actions/generateBackup';
import renameFilesName from '@/actions/renameFilesName';
import fix from '@/actions/fix';
import convert from '@/actions/convert';

const label = 'index';

const logger = new LoggerTool();

logger.setLabel(label);

logger.verbose('日志系统启动成功');

const dev = !!process.env.dev;
if (dev) {
  logger.verbose('开发模式下，所有批量操作均只执行一次');
}

// 校验工作目录
checkDirectories();

// 备份m3u8文件
generateBackup();

// 重命名m3u8文件
renameFilesName();

// 修复m3u8文件的数据
fix();

// 进行格式转换
if (enableConvert) {
  convert();
}

// 判断保存备份的m3u8文件
if (!saveBackupM3u8File) {
  deleteFolderRecursive(workDirectories.backupPath);
}
