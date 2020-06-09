import { OutputFileTypes } from './types';

export const workDirectories = {
  inputPath: 'D:/study_data/m3u8Resources/raw',
  outputPath: 'E:/FFMpegOutput/videoData',
  backupPath: 'E:/FFMpegOutput/backupM3u8Files',
};

export const saveM3u8File: boolean = true;

export const outputFileExtension: OutputFileTypes = OutputFileTypes.mp4;

export default {
  workDirectories,
  saveM3u8File,
  outputFileExtension,
};
