"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var child_process_1 = require("child_process");
var utils_1 = require("@/utils");
var config_1 = require("@/config");
// 判断临时文件夹是否存在，如果不存在则进行创建
var isTempDirExist = fs_1.default.existsSync(config_1.tempPath);
if (!isTempDirExist) {
    fs_1.default.mkdirSync(config_1.tempPath);
    utils_1.Log.greenBright('临时文件夹创建完成：', config_1.tempPath);
}
// 读取m3u8的索引文件
var m3u8Files = fs_1.default.readdirSync(config_1.inputPath).filter(function (value) { return value.endsWith('.m3u8'); });
// 过滤文件名的正则表达式
var fileNameReg = /[^\u4e00-\u9fa5\w.-]/g;
/**
 * 将文件复制到临时文件夹，并进行重新命名
 * 删除文件名中除汉字、英文字母和数字的字符
 */
m3u8Files.forEach(function (value) {
    try {
        var newFileName = value.replace(fileNameReg, '');
        fs_1.default.copyFileSync(config_1.inputPath + "/" + value, config_1.tempPath + "/" + newFileName);
    }
    catch (e) {
        utils_1.Log.redBright('临时文件生成出现了错误：', value + "\uFF1A" + JSON.stringify(e));
    }
});
utils_1.Log.greenBright('临时文件创建完成，文件名中的除中文、英文、数字、下划线、点和中横线外的字符都会被删除');
// 读取重命名完成的临时文件
var tempM3u8Files = fs_1.default.readdirSync(config_1.tempPath);
// 切换进程工作目录到临时文件夹
process.chdir(config_1.tempPath);
var keyReg = /URI="(.*)\/(\w*)\/(\w*)"/;
/**
 * 如果视频文件被加密，则修正密钥的加载路径
 */
tempM3u8Files.forEach(function (value) {
    try {
        // 获取当前m3u8文件
        var m3u8File = fs_1.default.readFileSync(config_1.tempPath + "/" + value, 'utf8');
        // 判断是否加密
        var isEncrypted = m3u8File.match(keyReg);
        if (isEncrypted) {
            // 如果加密，则处理密钥的路径
            var keyUri = isEncrypted[1];
            var newM3u8File = m3u8File.replace(keyUri, config_1.inputPath);
            var tempFile = config_1.tempPath + "/" + value;
            fs_1.default.writeFileSync(tempFile, newM3u8File);
            utils_1.Log.greenBright('文件密钥信息修正完成：', value);
        }
        else {
            // 如果加密，输出日志
            utils_1.Log.greenBright('文件未加密：', value);
        }
    }
    catch (e) {
        utils_1.Log.redBright('密钥路径修正过程出现了错误：', value + "\uFF1A" + JSON.stringify(e));
    }
});
var pathReg = /(\/.*\w)(\/\/?)(\w*)\/(\w*\s)/;
/**
 * 进行视频数据路径修正
 */
tempM3u8Files.forEach(function (value) {
    utils_1.Log.blueBright('正在处理的m3u8文件：', value);
    try {
        var m3u8File = fs_1.default.readFileSync(config_1.tempPath + "/" + value, 'utf8');
        var basePath = m3u8File.match(pathReg);
        if (basePath) {
            // 这是错误的路径，不包括末尾的'/'符号
            var path = basePath[1];
            // 在UC的之前版本中，路径中存在错误符号'//'，需要进行特殊判断
            var errSign = basePath[2] === '//' ? '//' : null;
            // 对路径进行修复
            var temp = m3u8File.replace(new RegExp(path, 'g'), config_1.inputPath);
            // 最终视频索引数据
            var newM3u8File = temp;
            // 如果存在'//'错误，则进行修复
            if (errSign) {
                newM3u8File = temp.replace(new RegExp(errSign, 'g'), '/');
            }
            // 临时文件的路径
            var tempFilePath = config_1.tempPath + "/" + value;
            fs_1.default.writeFileSync(tempFilePath, newM3u8File);
            utils_1.Log.greenBright('视频路径修正完成：', value);
        }
    }
    catch (e) {
        utils_1.Log.redBright('视频路径修正过程出现了错误：', value + "\uFF1A" + JSON.stringify(e));
    }
});
// 对视频进行格式转换
tempM3u8Files.forEach(function (value) {
    utils_1.Log.blueBright('正在转换中：', value);
    var outputFilePath = config_1.outputPath + "/" + value.slice(0, value.length - 5) + "." + config_1.outputFileType;
    try {
        child_process_1.execSync("ffmpeg -allowed_extensions ALL -i " + value + " " + outputFilePath + " -loglevel warning");
        utils_1.Log.blueBright('文件格式转换完成：', value);
    }
    catch (e) {
        utils_1.Log.redBright('格式转换过程中出现了错误：', value + "\uFF1A" + JSON.stringify(e));
    }
});
// 判断是否需要删除临时文件夹
if (!config_1.saveM3u8File) {
    utils_1.deleteFolderRecursive(config_1.tempPath);
    utils_1.Log.greenBright('临时文件夹删除完成');
}
