#!/usr/bin/env node
/* global console */

import * as esbuild from 'esbuild';
import { spawn } from 'child_process';
import open from 'open';
import fs from 'fs';

const serverAppContext = await esbuild.context({
  entryPoints: ['./server/src/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: './dist/index.cjs',
});

const clientAppContext = await esbuild.context({
  entryPoints: ['./client/src/index.ts'],
  bundle: true,
  outfile: './dist/www/bundle.js',
  format: 'esm',
});

function copyStaticFiles() {
  fs.cpSync('./client/www', './dist/www', { recursive: true }, (err) => {
    if (err) {
      console.error('An error occurred while copying the static files.');
      return console.error(err);
    }
  });
}

console.log('Building server and client...\n');
copyStaticFiles();
await serverAppContext.rebuild();
await clientAppContext.rebuild();

await clientAppContext.watch();
console.log('Watching client for changes...\n');
await serverAppContext.watch();
console.log('Watching server for changes...\n');

const server = spawn('node', ['./dist/index.cjs'], {});
server.stdout.on('data', (data) => console.log(`${data}`));
server.stderr.on('data', (data) => console.error(`${data}`));
open('http://localhost:4000');
