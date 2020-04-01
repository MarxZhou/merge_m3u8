import fs from 'fs';
import { execSync } from 'child_process';

import { Log, deleteFolderRecursive } from '@/utils';
import { inputPath, outputPath, tempPath, saveM3u8File, outputFileType } from '@/config';

// 判断临时文件夹是否存在，如果不存在则进行创建
const isTempDirExist: boolean = fs.existsSync(tempPath);
if (!isTempDirExist) {
  fs.mkdirSync(tempPath);
  Log.greenBright('临时文件夹创建完成：', tempPath);
}

// 读取m3u8的索引文件
const m3u8Files: string[] = fs.readdirSync(inputPath).filter(value => value.endsWith('.m3u8'));

// 过滤文件名的正则表达式
const fileNameReg: RegExp = /[^\u4e00-\u9fa5\w.-]/g;

/**
 * 将文件复制到临时文件夹，并进行重新命名
 * 删除文件名中除汉字、英文字母和数字的字符
 */
m3u8Files.forEach((value: string) => {
  try {
    const newFileName: string = value.replace(fileNameReg, '');

    fs.copyFileSync(`${inputPath}/${value}`, `${tempPath}/${newFileName}`);
  } catch (e) {
    Log.redBright('临时文件生成出现了错误：', `${value}：${JSON.stringify(e)}`);
  }
});
Log.greenBright('临时文件创建完成，文件名中的除中文、英文、数字、下划线、点和中横线外的字符都会被删除');

// 读取重命名完成的临时文件
const tempM3u8Files: string[] = fs.readdirSync(tempPath);

// 切换进程工作目录到临时文件夹
process.chdir(tempPath);

const keyReg: RegExp = /URI="(.*)\/(\w*)\/(\w*)"/;

/**
 * 如果视频文件被加密，则修正密钥的加载路径
 */
tempM3u8Files.forEach((value: string) => {
  try {
    // 获取当前m3u8文件
    const m3u8File: string = fs.readFileSync(`${tempPath}/${value}`, 'utf8');

    // 判断是否加密
    const isEncrypted: RegExpMatchArray | null = m3u8File.match(keyReg);

    if (isEncrypted) {
      // 如果加密，则处理密钥的路径
      const keyUri: string = isEncrypted[1];

      const newM3u8File: string = m3u8File.replace(keyUri, inputPath);

      const tempFile: string = `${tempPath}/${value}`;

      fs.writeFileSync(tempFile, newM3u8File);

      Log.greenBright('文件密钥信息修正完成：', value);
    } else {
      // 如果加密，输出日志
      Log.greenBright('文件未加密：', value);
    }
  } catch (e) {
    Log.redBright('密钥路径修正过程出现了错误：', `${value}：${JSON.stringify(e)}`);
  }
});

const pathReg: RegExp = /(\/.*\w)(\/\/?)(\w*)\/(\w*\s)/;

/**
 * 进行视频数据路径修正
 */
tempM3u8Files.forEach((value: string) => {
  Log.blueBright('正在处理的m3u8文件：', value);
  try {
    const m3u8File: string = fs.readFileSync(`${tempPath}/${value}`, 'utf8');

    const basePath: RegExpMatchArray | null = m3u8File.match(pathReg);

    if (basePath) {
      // 这是错误的路径，不包括末尾的'/'符号
      const path: string = basePath[1];

      // 在UC的之前版本中，路径中存在错误符号'//'，需要进行特殊判断
      const errSign: string | null = basePath[2] === '//' ? '//' : null;

      // 对路径进行修复
      const temp: string = m3u8File.replace(new RegExp(path, 'g'), inputPath);

      // 最终视频索引数据
      let newM3u8File = temp;

      // 如果存在'//'错误，则进行修复
      if (errSign) {
        newM3u8File = temp.replace(new RegExp(errSign, 'g'), '/');
      }

      // 临时文件的路径
      const tempFilePath = `${tempPath}/${value}`;

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

  const outputFilePath: string = `${outputPath}/${value.slice(0, value.length - 5)}.${outputFileType}`;

  try {
    execSync(`ffmpeg -allowed_extensions ALL -i ${value} ${outputFilePath} -loglevel warning`);
    Log.blueBright('文件格式转换完成：', value);
  } catch (e) {
    Log.redBright('格式转换过程中出现了错误：', `${value}：${JSON.stringify(e)}`);
  }
});

// 判断是否需要删除临时文件夹
if (!saveM3u8File) {
  deleteFolderRecursive(tempPath);
  Log.greenBright('临时文件夹删除完成');
}
