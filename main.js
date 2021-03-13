import {promises as fs} from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import {createDir, getFiles, isExist} from './helper.js';
import {argv} from './argv.js';

let count = 0;
const __dirname = path.resolve();
const base = path.normalize(path.join(__dirname, argv.entry));
const resultDir = path.normalize(path.join(__dirname, argv.output));
const removeAfterSort = argv.remove || false;

const readDir = async (base) => {
  const files = await getFiles(base);
  if (!files) {
    return '';
  }

  for (const item of files) {
    let localBase = path.join(base, item);
    const state = await isExist(localBase);
    if (state.isDirectory()) {
      await readDir(localBase);
    } else {
      const currentPath = path.join(base, item);
      const currentFolderPath = path.join(resultDir, item[0].toUpperCase())
      // Created result dir
      await createDir(resultDir)
      // Create dir for current file
      await createDir(currentFolderPath);
      // Create new path for file
      const newPath = path.join(currentFolderPath, item);
      // Copy file to special folder
      await fs.copyFile(currentPath, newPath)
      count += 1;
    }

  }

  if (removeAfterSort) {
    rimraf(base, (err) => {
      if (err) {
        console.log(err);
      }
      console.log('remove folder');
    });
  }
}

(async () => {
  try {
    await readDir(base);
    console.log(`--===sort ${count} file(s)===--`)
  } catch (err) {
    console.log(err)
  }
})();
