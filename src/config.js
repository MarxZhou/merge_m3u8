"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OutputFileType;
(function (OutputFileType) {
    OutputFileType["mp4"] = "mp4";
    OutputFileType["avi"] = "avi";
    OutputFileType["mkv"] = "mkv";
})(OutputFileType = exports.OutputFileType || (exports.OutputFileType = {}));
exports.inputPath = 'D:/study_data/rawData';
exports.outputPath = 'D:/study_data/mp4Data';
exports.tempPath = 'D:/study_data/Temp';
exports.saveM3u8File = false;
exports.outputFileType = OutputFileType.mp4;
exports.default = {
    inputPath: exports.inputPath,
    outputPath: exports.outputPath,
    tempPath: exports.tempPath,
    saveM3u8File: exports.saveM3u8File,
    outputFileType: exports.outputFileType,
};
