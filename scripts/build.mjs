#!/usr/bin/env node
/* global console, process */

import esbuild from 'esbuild';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();
const PUBLIC_DIR = process.env.PUBLIC_DIR || 'public';

const buildClientApp = async () => {
  console.log('Copying static files...');
  fs.cpSync(
    './client/www',
    `./dist/${PUBLIC_DIR}`,
    { recursive: true },
    (err) => {
      if (err) {
        console.error('An error occurred while copying the folder.');
        return console.error(err);
      }
      console.log('Done.');
    },
  );

  return esbuild.build({
    entryPoints: ['./client/src/index.ts'],
    bundle: true,
    outfile: `./dist/${PUBLIC_DIR}/bundle.js`,
    format: 'esm',
    minify: true,
    metafile: true,
  });
};

console.log('Cleaning up the dist folder...');
fs.rmSync('./dist', { recursive: true, force: true });
console.log('Done.\n');

console.log('Copying server app...');
fs.cpSync('./server', './dist', { recursive: true }, (err) => {
  if (err) {
    console.error('An error occurred while copying the server files.');
    return console.error(err);
  }
});
console.log('Done.\n');

console.log('Building client app...');
const result = await buildClientApp();
const meta = await esbuild.analyzeMetafile(result.metafile);
console.log(meta);
console.log('Done.\n');

// Remove the metafile
fs.rmSync('./dist/metafile.json', { force: true });

console.log(
  '%cBuild successful. Find the built files at ./dist\n',
  'color: green; font-weight: bold;',
);
