#!/usr/bin/env node
/* global console */

import * as fs from 'fs';

console.log('Cleaning up the dist folder...');
fs.rmSync('./dist', { recursive: true, force: true });
console.log('Done.\n');
