"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var OutputFileType;
(function (OutputFileType) {
    OutputFileType["mp4"] = "mp4";
    OutputFileType["avi"] = "avi";
    OutputFileType["mkv"] = "mkv";
})(OutputFileType = exports.OutputFileType || (exports.OutputFileType = {}));
var path = {
    inputPath: 'D:/study_data/rawData',
    outputPath: 'D:/study_data/mp4Data',
    tempPath: 'D:/study_data/Temp',
    saveM3u8File: false,
    outputFileType: OutputFileType.mp4,
};
exports.default = path;
