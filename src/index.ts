import fs from 'fs';
import { execSync } from 'child_process';

import { workDirectories, saveM3u8File, outputFileExtension } from '@/config';

import { Log, deleteFolderRecursive } from '@/utils';
import { pathReg } from '@/reg';

import { checkDirectories } from '@/check';
import { generateBackup } from '@/generateBackup';
import { readM3u8Files } from '@/readFiles';
import { fixSecretKey } from '@/fixSecretKey';
import { fixVideoData } from '@/fixVideoData';

// 备份m3u8文件
generateBackup();

// 校验工作目录
checkDirectories();

// 读取m3u8的索引文件
const m3u8Files = readM3u8Files();

// 修复m3u8的密钥路径
fixSecretKey();

// 修复m3u8文件的视频数据
fixVideoData();

/**
 * 进行视频数据路径修正
 */
tempM3u8Files.forEach((value: string) => {
  Log.blueBright('正在处理的m3u8文件：', value);
  try {
    const m3u8File: string = fs.readFileSync(`${workDirectories.backupPath}/${value}`, 'utf8');

    const basePath: RegExpMatchArray | null = m3u8File.match(pathReg);

    if (basePath) {
      // 这是错误的路径，不包括末尾的'/'符号
      const path: string = basePath[1];

      // 在UC的之前版本中，路径中存在错误符号'//'，需要进行特殊判断
      const errSign: string | null = basePath[2] === '//' ? '//' : null;

      // 对路径进行修复
      const temp: string = m3u8File.replace(new RegExp(path, 'g'), workDirectories.inputPath);

      // 最终视频索引数据
      let newM3u8File = temp;

      // 如果存在'//'错误，则进行修复
      if (errSign) {
        newM3u8File = temp.replace(new RegExp(errSign, 'g'), '/');
      }

      // 临时文件的路径
      const tempFilePath = `${workDirectories.backupPath}/${value}`;

      fs.writeFileSync(tempFilePath, newM3u8File);
      Log.greenBright('视频路径修正完成：', value);
    }
  } catch (e) {
    Log.redBright('视频路径修正过程出现了错误：', `${value}：${JSON.stringify(e)}`);
  }
});

// 对视频进行格式转换
tempM3u8Files.forEach((value: string) => {
  Log.blueBright('正在转换中：', value);

  const outputFilePath: string = `${workDirectories.outputPath}/${value.slice(
    0,
    value.length - 5
  )}.${outputFileExtension}`;

  try {
    execSync(`ffmpeg -allowed_extensions ALL -i ${value} ${outputFilePath} -loglevel warning`);
    Log.blueBright('文件格式转换完成：', value);
  } catch (e) {
    Log.redBright('格式转换过程中出现了错误：', `${value}：${JSON.stringify(e)}`);
  }
});

// 判断是否需要删除临时文件夹
if (!saveM3u8File) {
  deleteFolderRecursive(workDirectories.backupPath);
  Log.greenBright('临时文件夹删除完成');
}
