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

const buildServerApp = async () => {
  console.log('Copying static files...');
  fs.cpSync(
    './server/www',
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
    entryPoints: ['./server/src/index.ts'],
    bundle: true,
    outfile: `./dist/index.js`,
    format: 'cjs',
    platform: 'node',
    minify: true,
    metafile: true,
  });
};

console.log('Cleaning up the dist folder...');
fs.rmSync('./dist', { recursive: true, force: true });
console.log('Done.\n');

console.log('Building server app...');
const serverResult = await buildServerApp();
const serverMeta = await esbuild.analyzeMetafile(serverResult.metafile);
console.log(serverMeta);
console.log('Done.\n');

console.log('Building client app...');
const clientResult = await buildClientApp();
const clientMeta = await esbuild.analyzeMetafile(clientResult.metafile);
console.log(clientMeta);
console.log('Done.\n');

// Remove the metafile
fs.rmSync('./dist/metafile.json', { force: true });

console.log(
  '%cBuild successful. Find the built files at ./dist\n',
  'color: green; font-weight: bold;',
);
