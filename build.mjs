#!/usr/bin/env node

import * as esbuild from 'esbuild';
import * as fs from 'fs';

const buildServerApp = async () =>
  esbuild.build({
    entryPoints: ['./server/src/index.ts'],
    bundle: true,
    platform: 'node',
    outfile: './dist/index.js',
    minify: true,
    metafile: true,
  });

const buildClientApp = async () => {
  console.log('Copying static files from client/www to dist/www...');
  fs.cpSync('./client/www', './dist/www', { recursive: true }, (err) => {
    if (err) {
      console.error('An error occurred while copying the folder.');
      return console.error(err);
    }
    console.log('Done.');
  });

  return esbuild.build({
    entryPoints: ['./client/src/index.ts'],
    bundle: true,
    outfile: './dist/www/bundle.js',
    format: 'esm',
    minify: true,
    metafile: true,
  });
};

console.log('Cleaning up the dist folder...');
fs.rmSync('./dist', { recursive: true, force: true });
console.log('Building...');
let result = await buildServerApp();
let meta = await esbuild.analyzeMetafile(result.metafile);
console.log('Server app built.');
console.log(meta);
result = await buildClientApp();
meta = await esbuild.analyzeMetafile(result.metafile);
console.log('Client app built.');
console.log(meta);
fs.rmSync('./dist/metafile.json', { force: true }); // Remove the metafile
console.log('Done. Find the built files in the dist folder.');
