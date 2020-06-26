import { OutputFileTypes } from '@/config/types';
import { processCmdParams } from '@/utils';
import LoggerTool from '@/logger';

const label = 'config';

const logger = new LoggerTool();

logger.setLabel(label);

interface DefaultConfig {
  inputPath: string;
  outputPath: string;
  backupPath: string;
  relativeBackupPath: string;
  saveBackupM3u8File: boolean;
  outputFileExtension: OutputFileTypes;
  enableConvert: boolean;
  needRelativeBackupM3u8File: boolean;
}

const defaultConfig: DefaultConfig = {
  inputPath: 'E:/m3u8Resources',
  outputPath: 'E:/FFMpegOutput/videoData',
  backupPath: 'E:/FFMpegOutput/backupM3u8Files',
  relativeBackupPath: 'E:/FFMpegOutput/relativeBackupM3u8Files',
  saveBackupM3u8File: true,
  outputFileExtension: OutputFileTypes.mp4,
  enableConvert: true,
  needRelativeBackupM3u8File: true,
};

const cmdParams = ((): DefaultConfig => {
  const t: any = {};
  const p = processCmdParams();

  Object.entries(p).forEach(([key, value]): void => {
    if (Object.keys(defaultConfig).includes(key)) {
      if (value === 'true') {
        t[key] = true;
      } else if (value === 'false') {
        t[key] = false;
      } else {
        t[key] = value;
      }
    }
  });

  return { ...defaultConfig, ...t };
})();

logger.verbose(`配置信息：${JSON.stringify(cmdParams)}`, {
  config: cmdParams,
});

export const workDirectories = {
  // m3u8资源路径
  inputPath: cmdParams.inputPath,
  // 转换格式后的输出路径，该路径中不能存在同名文件，否则会因为无法覆盖而失败
  outputPath: cmdParams.outputPath,
  // 原始m3u8文件的备份路径
  backupPath: cmdParams.backupPath,
  // 采用相对路径方案的备份文件的保存路径
  relativeBackupPath: cmdParams.relativeBackupPath,
};

// 转换成功后，是否需要保存备份文件
// 是否能够播放需要软件支持
// 备份文件默认采用绝对路径，可以放置在当前设备的任意位置进行播放
export const saveBackupM3u8File = cmdParams.saveBackupM3u8File;

// 转换通用视频文件的扩展名
export const outputFileExtension: OutputFileTypes = cmdParams.outputFileExtension;

// 是否需要进行格式转换，测试使用
export const enableConvert = cmdParams.enableConvert;

// 是否需要生成相对路径的备份m3u8文件
// 是否能够播放需要软件支持
// 相对路径的m3u8文件只能放在m3u8的资源目录中进行播放
export const needRelativeBackupM3u8File = cmdParams.needRelativeBackupM3u8File;

export default {
  workDirectories,
  saveBackupM3u8File,
  outputFileExtension,
  enableConvert,
};
