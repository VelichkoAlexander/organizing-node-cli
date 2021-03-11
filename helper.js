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

export const getFiles = (base, cb) => {
  try {
    cb(null, fs.readdirSync(base));
  } catch (err) {
    console.log(err.message);
  }
}
