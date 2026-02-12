/* global console, process */

import { fileURLToPath } from 'url';
import * as path from 'path';
import { spawn } from 'child_process';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config(); // Load .env file for keys

let server;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = process.env.PUBLIC_DIR || 'public';

export const copyStaticFiles = {
  name: 'copyStaticFiles',
  setup(build) {
    build.onEnd((result) => {
      if (result.errors.length > 0) {
        console.error('An error occurred while building the project.');
        return console.error(result.errors);
      }
      const from = path.join(__dirname, '..', PUBLIC_DIR);
      const to = path.join(__dirname, '..', 'dist', PUBLIC_DIR);
      fs.cpSync(from, to, { recursive: true }, (err) => {
        if (err) {
          console.error(`An error occurred while copying ${from} to ${to}.`);
          return console.error(err);
        }
      });
    });
  },
};

export const relaunchOnBuild = {
  name: 'relaunchOnBuild',
  setup(build) {
    build.onEnd(() => {
      console.log('Relaunching server...');

      if (server) {
        server.kill();
      }

      server = spawn('node', ['./dist/index.js'], { platform: 'node' });
      server.stdout.on('data', (data) => console.log(`${data}`));
      server.stderr.on('data', (data) => console.error(`${data}`));
    });
  },
};
