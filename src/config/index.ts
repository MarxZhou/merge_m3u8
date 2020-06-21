import { OutputFileTypes } from '@/config/types';

export const workDirectories = {
  // m3u8资源路径
  inputPath: 'E:/动漫m3u8',
  // 转换格式后的输出路径，该路径中不能存在同名文件，否则会因为无法覆盖而失败
  outputPath: 'E:/FFMpegOutput/videoData',
  // 原始m3u8文件的备份路径
  backupPath: 'E:/FFMpegOutput/backupM3u8Files',
  // 采用相对路径方案的备份文件的保存路径
  relativeBackupPath: 'E:/FFMpegOutput/relativeBackupM3u8Files',
};

// 转换成功后，是否需要保存备份文件
// 是否能够播放需要软件支持
// 备份文件默认采用绝对路径，可以放置在当前设备的任意位置进行播放
export const saveBackupM3u8File = true;

// 转换通用视频文件的扩展名
export const outputFileExtension: OutputFileTypes = OutputFileTypes.mp4;

// 是否需要进行格式转换，测试使用
export const enableConvert = true;

// 是否需要生成相对路径的备份m3u8文件
// 是否能够播放需要软件支持
// 相对路径的m3u8文件只能放在m3u8的资源目录中进行播放
export const needRelativeBackupM3u8File = true;

export default {
  workDirectories,
  saveBackupM3u8File,
  outputFileExtension,
  enableConvert,
};
