import { OutputFileTypes } from '@/config/types';

export const workDirectories = {
  inputPath: 'D:/study_data/m3u8Resources/raw',
  outputPath: 'E:/FFMpegOutput/videoData',
  backupPath: 'E:/FFMpegOutput/backupM3u8Files',
};

export const saveBackupM3u8File = true;

export const outputFileExtension: OutputFileTypes = OutputFileTypes.mp4;

export default {
  workDirectories,
  saveBackupM3u8File,
  outputFileExtension,
};
