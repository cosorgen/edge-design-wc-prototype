#!/usr/bin/env node

import * as esbuild from 'esbuild';
import { spawn } from 'child_process';
import open from 'open';
import fs from 'fs';

const serverAppContext = await esbuild.context({
  entryPoints: ['./server/src/index.ts'],
  bundle: true,
  platform: 'node',
  outfile: './dist/index.js',
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

console.log('Starting server and client watch mode...\n');
copyStaticFiles();
await clientAppContext.watch();
console.log('Watching client for changes...\n');
await serverAppContext.watch();
console.log('Watching server for changes...\n');

const server = spawn('node', ['./dist/index.js'], {});
server.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});
server.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});
server.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
console.log('Server started...\n');
open('http://localhost:4000');
