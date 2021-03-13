import {promises as fs} from 'fs';
import path from 'path';
import yargs from 'yargs';
import rimraf from 'rimraf';

import {createDir, getFiles, isExist} from './helper.js';

const __dirname = path.resolve();

const argv = yargs(process.argv)
  .usage("Usage: node $0 [options]")
  .help('help')
  .alias('help', 'h')
  .version('1.0.0')
  .alias('version', 'v')
  .example('node $0 --entry [path]', 'File sort')
  .option('entry', {
    alias: 'e',
    describe: 'Start folder path',
    demandOption: true
  })
  .option('output', {
    alias: 'o',
    describe: "Result folder path",
    default: '/result'
  })
  .option('remove', {
    alias: "D",
    describe: 'Remove start folder?',
    type: 'boolean',
    default: false
  })
  .epilog('Program for Sort')
  .argv

let count = 0;
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
