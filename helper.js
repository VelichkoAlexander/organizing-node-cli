import fs from "fs";

export const createDir = (dirName = '', cb) => {
  if (!fs.existsSync(dirName)) {
    try {
      fs.mkdirSync(dirName)
    } catch (err) {
      console.log(`Can't create ${dirName} dir. Error is ${err.message}`);
    }
  }
  cb(null, dirName);
}

export const moveFile = (currentPath, newPath, cb) => {
  try {
    cb(fs.renameSync(currentPath, newPath));
  } catch (err) {
    console.log(`I have error for you:) ${err.message}`);
  }
}

export const removeDir = (dir, cb) => {
  try {
    cb(null, fs.rmdirSync(dir, {recursive: true}))
  } catch (err) {
    console.log(err);
  }
}

export const getFiles = (base, cb) => {
  try {
    cb(null, fs.readdirSync(base));
  } catch (err) {
    console.log(err.message);
  }
}

export const errorHandler = () => {

}