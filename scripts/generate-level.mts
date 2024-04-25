#!/usr/bin/env node

import * as prettier from 'prettier';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
  .option('columns', {
    type: 'number',
    required: true,
    describe: 'Number of columns',
  })
  .option('rows', {
    type: 'number',
    required: true,
    describe: 'Number of rows',
  })
  .option('colors', {
    type: 'number',
    required: true,
    describe: 'Number of colors',
  })
  .option('fill', {
    type: 'number',
    required: true,
    describe: 'Decimal between 0 and 1',
  })
  .parseSync();

function random<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

const colors = [
  'R',
  'P',
  'O',
  'Y',
  'L',
  'V',
  'M',
  'I',
  'G',
  'T',
  'A',
  'B',
  'N',
  'K',
  'S',
];

const levelColors = Array(argv.colors)
  .fill(undefined)
  .map(() => random(colors));

const level = Array(argv.rows)
  .fill(undefined)
  .map(() =>
    Array(argv.columns)
      .fill(undefined)
      .map(() => (Math.random() < argv.fill ? random(levelColors) : '_')),
  );

const levelString = JSON.stringify(level).replace(/"/g, '');

prettier
  .format(levelString, { parser: 'babel' })
  // eslint-disable-next-line no-console
  .then((value) => console.log(`\n${value}`));
