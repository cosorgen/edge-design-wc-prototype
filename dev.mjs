#!/usr/bin/env node

import * as esbuild from 'esbuild';
import * as fs from 'fs';
import open from 'open';

const serverAppContext = await esbuild.context({
  entryPoints: ['./server/src/index.ts'],
  bundle: true,
  platform: 'node',
  outfile: './dist/index.js',
});

const copyClientStaticFiles = () => {
  fs.cpSync('./client/www', './dist/www', { recursive: true }, (err) => {
    if (err) {
      console.error('An error occurred while copying the folder.');
      return console.error(err);
    }
    console.log('Done.');
  });
};

const clientAppContext = await esbuild.context({
  entryPoints: ['./client/src/index.ts'],
  bundle: true,
  outfile: './dist/www/bundle.js',
  format: 'esm',
});

const serve = () => {
  import('./dist/index.js');
};

console.log('Starting server and client watch mode...\n');
serverAppContext.watch();
copyClientStaticFiles();
clientAppContext.watch();

serve();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 4000;
open(`http://localhost:${PORT}`);
