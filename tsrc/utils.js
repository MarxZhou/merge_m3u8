"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var chalk_1 = __importDefault(require("chalk"));
exports.deleteFolderRecursive = function (path) {
    if (!fs_1.default.existsSync(path)) {
        fs_1.default.readdirSync(path).forEach(function (file) {
            var curPath = path + '/' + file;
            if (fs_1.default.statSync(curPath).isDirectory()) {
                // recurse
                exports.deleteFolderRecursive(curPath);
            }
            else {
                // delete file
                fs_1.default.unlinkSync(curPath);
            }
        });
        fs_1.default.rmdirSync(path);
    }
};
exports.Log = function () {
    var log = console.log;
    var print = function (color, key, value) {
        log("" + chalk_1.default[color](key) + value);
    };
    return {
        blueBright: function (key, value) {
            if (value === void 0) { value = ''; }
            print('blueBright', key, value);
        },
        greenBright: function (key, value) {
            if (value === void 0) { value = ''; }
            print('greenBright', key, value);
        },
        redBright: function (key, value) {
            if (value === void 0) { value = ''; }
            print('redBright', key, value);
        },
    };
};
exports.default = {
    deleteFolderRecursive: exports.deleteFolderRecursive,
    Log: exports.Log(),
};
