import lineReader from 'readline';

import { readTempFile } from '@/readFiles';
import { pathReg } from '@/reg';

export const fixVideoData = (): void => {
  const tempM3u8Files = readTempFile();
  tempM3u8Files.forEach((value): void => {
    const basePath: RegExpMatchArray | null = value.match(pathReg);
  });
};

export default fixVideoData;
