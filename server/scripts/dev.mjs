/* global console, process */

import * as esbuild from 'esbuild';
import open from 'open';
import dotenv from 'dotenv';
import { copyStaticFiles, relaunchOnBuild } from './plugins.mjs';

dotenv.config(); // Load .env file for keys
const PORT = process.env.PORT || 8080;

const serverAppContext = await esbuild.context({
  entryPoints: ['src/index.ts'],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  outfile: './dist/index.js',
  plugins: [copyStaticFiles, relaunchOnBuild],
});

console.log('Building server and client...\n');
await serverAppContext.rebuild();
await serverAppContext.watch();
console.log('Watching server for changes...\n');

open(`http://localhost:${PORT}`);
