import fs from 'fs';
import { workDirectories } from '@/config';

export const readM3u8Files = (): string[] => {
  return fs.readdirSync(workDirectories.inputPath).filter(value => value.endsWith('.m3u8'));
};

export const readTempFile = (): string[] => {
  return fs.readdirSync(workDirectories.backupPath).filter(value => value.endsWith('.m3u8'));
};

export default { readM3u8Files, readTempFile };
