import fs from 'fs';

export const deleteFolderRecursive: (path: string) => void = path => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file: string) => {
      const curPath: string = path + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath);
      } else {
        // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

export default {
  deleteFolderRecursive,
};
