import {promises as fs} from 'fs';

export const createDir = async (path = '') => {
  try {
    await fs.stat(path);
  } catch (err) {
    try {
      return await fs.mkdir(path)
    } catch (err) {
      console.log(`Can't create ${path} dir. Error is ${err.message}`);
    }
  }
}

export const getFiles = async (base) => {
  try {
    return await fs.readdir(base);
  } catch (err) {
    console.log(err);
    return false;
  }
}

export const isExist = async (path) => {
  try {
    return await fs.stat(path);
  } catch (err) {
    console.log(err);
    return false;
  }
}
