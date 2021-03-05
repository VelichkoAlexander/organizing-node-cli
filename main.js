import fs from 'fs';
import path from 'path';
import {getArgs, createDir, moveFile, removeDir, getFiles} from './helper.js';

const options = getArgs();
const __dirname = path.resolve();

const base = options.base || './test';
const resultDir = options.result || './result';
const removeAfterSort = options.remove || false;

const readDir = (base) => {
  const files = getFiles(base);

  if(!files) {
    return '';
  }

  files.forEach(item => {

    let localBase = path.join(base, item);
    let state = fs.statSync(localBase);
    let currentDir = path.join(__dirname, base);

    if (state.isDirectory()) {
      readDir(localBase);
    } else {
      // Created result dir
      createDir(resultDir);
      // Get path for current file
      const currentPath = path.join(currentDir, item);
      // Create dir for current file
      const dirForFile = createDir(path.join(resultDir, item[0]));
      // Create new path for file
      const newPath = path.join(dirForFile, item);
      // Move file to special folder
      moveFile(currentPath, newPath);
    }
  });
  if (removeAfterSort) {
    removeDir(base);
  }
}

readDir(base);