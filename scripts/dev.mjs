#!/usr/bin/env node
/* global console, process */

import esbuild from 'esbuild';
import { spawn } from 'child_process';
import open from 'open';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 8080;
const PUBLIC_DIR = process.env.PUBLIC_DIR || 'public';

let copyStaticFiles = (dir) => ({
  name: 'copyStaticFiles',
  setup(build) {
    build.onEnd((result) => {
      if (result.errors.length > 0) {
        console.error('An error occurred while building the project.');
        return console.error(result.errors);
      }
      fs.cpSync(dir, `./dist/${PUBLIC_DIR}`, { recursive: true }, (err) => {
        if (err) {
          console.error('An error occurred while copying the static files.');
          return console.error(err);
        }
      });
    });
  },
});

const serverAppContext = await esbuild.context({
  entryPoints: ['./server/src/index.ts'],
  bundle: true,
  outfile: `./dist/index.js`,
  format: 'cjs',
  platform: 'node',
  plugins: [copyStaticFiles('./server/www')],
});

const clientAppContext = await esbuild.context({
  entryPoints: ['./client/src/index.ts'],
  bundle: true,
  outfile: `./dist/${PUBLIC_DIR}/bundle.js`,
  format: 'esm',
  plugins: [copyStaticFiles('./client/www')],
});

console.log('Building server...\n');
await serverAppContext.rebuild();
await serverAppContext.watch();
console.log('Watching server for changes...\n');

console.log('Building client...\n');
await clientAppContext.rebuild();
await clientAppContext.watch();
console.log('Watching client for changes...\n');

const server = spawn('node', ['./dist/index.js'], { platform: 'node' });
server.stdout.on('data', (data) => console.log(`${data}`));
server.stderr.on('data', (data) => console.error(`${data}`));
open(`http://localhost:${PORT}`);
