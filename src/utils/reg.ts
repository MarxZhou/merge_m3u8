export const fileNameReg = /[^\u4e00-\u9fa5\w.-]/g;

export const keyReg = /URI="(.*)\/(\w*)\/(\w*)"/;

export const pathReg = /(\/.*\w)(\/\/?)(\w*)\/(\w*\s)/;

export default {
  fileNameReg,
  keyReg,
  pathReg,
};
