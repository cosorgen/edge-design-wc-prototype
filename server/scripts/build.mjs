#!/usr/bin/env node
/* global console */

import * as esbuild from 'esbuild';
import * as fs from 'fs';
import { copyStaticFiles } from './plugins.mjs';

const buildServerApp = async () =>
  esbuild.build({
    entryPoints: ['./src/index.ts'],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    outfile: './dist/index.js',
    minify: true,
    metafile: true,
    plugins: [copyStaticFiles],
  });

console.log('Cleaning up the dist folder...');
fs.rmSync('./dist', { recursive: true, force: true });
console.log('Done.\n');

console.log('Building server app...');
let result = await buildServerApp();
let meta = await esbuild.analyzeMetafile(result.metafile);
console.log(meta);
console.log('Done.\n');

// Remove the metafile
fs.rmSync('./dist/metafile.json', { force: true });

console.log(
  '%cBuild successful. Find the built files at ./dist\n',
  'color: green; font-weight: bold;',
);
