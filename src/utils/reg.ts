export const fileNameReg = /[^\u4e00-\u9fa5\u0800-\u4e00\w.-]/gi;

export const pathReg = /([A-Za-z:])*\/.*\/(.*)(\/\w*)/gi;

export default {
  fileNameReg,
  pathReg,
};
