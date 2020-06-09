export const fileNameReg: RegExp = /[^\u4e00-\u9fa5\w.-]/g;

export const keyReg: RegExp = /URI="(.*)\/(\w*)\/(\w*)"/;

export const pathReg: RegExp = /(\/.*\w)(\/\/?)(\w*)\/(\w*\s)/;

export default {
  fileNameReg,
  keyReg,
  pathReg,
};
