export enum OutputFileType {
  mp4 = 'mp4',
  avi = 'avi',
  mkv = 'mkv',
}

export const inputPath: string = 'D:/study_data/rawData';
export const outputPath: string = 'D:/study_data/mp4Data';
export const tempPath: string = 'D:/study_data/Temp';
export const saveM3u8File: boolean = false;
export const outputFileType: OutputFileType = OutputFileType.mp4;

export default {
  inputPath,
  outputPath,
  tempPath,
  saveM3u8File,
  outputFileType,
};
