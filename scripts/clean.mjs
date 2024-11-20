#!/usr/bin/env node
/* global console */

import * as fs from 'fs';

console.log('Cleaning up dist folders...');
fs.rmSync('./dist', { recursive: true, force: true });
fs.rmSync('./packages/button/dist', { recursive: true, force: true });
fs.rmSync('./packages/composer/dist', { recursive: true, force: true });
fs.rmSync('./packages/design-tokens/dist', { recursive: true, force: true });
fs.rmSync('./packages/divider/dist', { recursive: true, force: true });
fs.rmSync('./packages/menu/dist', { recursive: true, force: true });
fs.rmSync('./packages/menu-button/dist', { recursive: true, force: true });
fs.rmSync('./packages/menu-item/dist', { recursive: true, force: true });
fs.rmSync('./packages/menu-list/dist', { recursive: true, force: true });
fs.rmSync('./packages/switch/dist', { recursive: true, force: true });
fs.rmSync('./packages/web-components-framework/dist', {
  recursive: true,
  force: true,
});
console.log('Done.\n');

console.log('Cleaning up node modules...');
fs.rmSync('./node_modules', { recursive: true, force: true });
fs.rmSync('./package-lock.json', { force: true });
fs.rmSync('./client/node_modules', { recursive: true, force: true });
fs.rmSync('./client/package-lock.json', { force: true });
fs.rmSync('./server/node_modules', { recursive: true, force: true });
fs.rmSync('./server/package-lock.json', { force: true });
console.log('Done.\n');
