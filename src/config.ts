export enum OutputFileType {
  mp4 = 'mp4',
  avi = 'avi',
  mkv = 'mkv',
}

export interface PathConfig {
  inputPath: string;
  outputPath: string;
  tempPath: string;
  saveM3u8File: boolean;
  outputFileType: OutputFileType;
}

const pathConfig: PathConfig = {
  inputPath: 'D:/study_data/rawData',
  outputPath: 'D:/study_data/mp4Data',
  tempPath: 'D:/study_data/Temp',
  saveM3u8File: false,
  outputFileType: OutputFileType.mp4,
};

export default pathConfig;
