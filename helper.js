import path from "path";
import fs from "fs";

export const createDir = (dirName = '') => {
  const dirPath = path.join(__dirname, dirName);
  if (!fs.existsSync(dirPath)) {
    try {
      fs.mkdirSync(dirPath);
      return dirPath;
    } catch (err) {
      console.log(`Can't create result dir. Error is ${err.message}`);
    }
  }
  return dirPath;
}

export const moveFile = (currentPath, newPath) => {
  try {
    fs.renameSync(currentPath, newPath)
    console.log(`Successfully moved the file!`);
  } catch (err) {
    console.log(`I have error for you:) ${err.message}`);
  }
}

export const removeDir = (dir) => {
  try {
    fs.rmdirSync(dir, {recursive: true});
  } catch (err) {
    console.log(err);
  }
}

export const getArgs = () => {
  const args = {};
  process.argv
    .slice(2, process.argv.length)
    .forEach(arg => {
      if (arg.slice(0, 2) === '--') {
        const longArg = arg.split('=');
        const longArgFlag = longArg[0].slice(2, longArg[0].length);
        args[longArgFlag] = longArg.length > 1 ? longArg[1] : true;
      } else if (arg[0] === '-') {
        const flags = arg.slice(1, arg.length).split('');
        flags.forEach(flag => {
          args[flag] = true;
        });
      }
    });
  return args;
}


export const getFiles = (base) => {
  try {
    return fs.readdirSync(base);
  } catch (err) {
    console.log(err.message);
  }
  return [];
}
