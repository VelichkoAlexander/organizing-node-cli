import {promises as fs} from 'fs';
import path from 'path';
import yargs from 'yargs';
import rimraf from 'rimraf';

import {createDir, getFiles} from './helper.js';

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

const base = path.normalize(path.join(__dirname, argv.entry));
const resultDir = path.normalize(path.join(__dirname, argv.output));
const removeAfterSort = argv.remove || false;

const readDir = async (base) => {
  const files = await getFiles(base);

  if (!files) {
    console.log('No dir and files in current dir');
  }

  files.forEach(item => {
    let localBase = path.join(base, item);
    const state = fs.stat(localBase);
    let currentDir = base;
    if (state.isDirectory()) {
      readDir(localBase);
    } else {
      // Created result dir
      createDir(resultDir, (err, result) => {
        const currentPath = path.join(currentDir, item);
        // Create dir for current file
        createDir(path.join(result, item[0].toUpperCase()), (err, result) => {
          // Create new path for file
          const newPath = path.join(result, item);
          // Move file to special folder
          fs.copyFile(currentPath, newPath, () => {
            console.log('copy file')
          })
        });
      });
    }
  })
  if (removeAfterSort) {
    rimraf(base, (err) => {
      if (err) {
        console.log(err);
      }
      console.log('remove folder');
    });
  }
}

readDir(base);