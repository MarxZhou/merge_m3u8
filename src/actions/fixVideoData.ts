import lineReader from 'readline';

import { readBackupFiles } from '@/actions/readFiles';
import { pathReg } from '@/utils/reg';

export const fixVideoData = (): void => {
  const tempM3u8Files = readBackupFiles();
  tempM3u8Files.forEach((value): void => {
    const basePath: RegExpMatchArray | null = value.match(pathReg);
  });
};

export default fixVideoData;
