#!/usr/bin/env node

import * as esbuild from 'esbuild';
import open from 'open';

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

function serve() {
  import('./dist/index.js');
  // eslint-disable-next-line no-undef
  const PORT = process.env.PORT || 4000;
  open(`http://localhost:${PORT}`);
}

console.log('Starting server and client watch mode...\n');
await clientAppContext.watch();
console.log('Watching client for changes...\n');
await serverAppContext.watch();
console.log('.\n');
serve();
