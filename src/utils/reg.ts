export const fileNameReg = /[^\w.]/gi;

export const pathReg = /([A-Za-z:])*\/.*\/(.*)(\/\w*)/gi;

export default {
  fileNameReg,
  pathReg,
};
