import yargs from "yargs";

export const argv = yargs(process.argv)
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