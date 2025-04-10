/* eslint-disable @typescript-eslint/no-unused-vars */
/* global console */

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

function JsToCppConst(string) {
  let out = 'k';
  const parts = string.split('.');
  out += parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  out += parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
  out += parts[2].replace('tone(', '').replace(')', '');
  if (parts[3]) {
    const opacity =
      parts[3].replace('opacity(', '') + '.' + parts[4].replace(')', '');
    out = `applyOpacity(${out}, ${opacity})`;
  }
  return out;
}

const { default: lightMapping } = await import(
  './data/lightThemeMapping.json',
  {
    with: { type: 'json' },
  }
);
const { default: darkMapping } = await import('./data/darkThemeMapping.json', {
  with: { type: 'json' },
});

// Generate cpp for multi palette
const content = {};
for (const [key, value] of Object.entries(darkMapping)) {
  const darkConstant = JsToCppConst(value);
  let lightConstant = `mixer[${key}]`;
  if (lightMapping[key]) {
    lightConstant = JsToCppConst(lightMapping[key]);
  }
  content[key] =
    `mixer[${key}] = dark_mode ? ${darkConstant} : ${lightConstant};`;
}
for (const [key, value] of Object.entries(lightMapping)) {
  if (!(key in content)) {
    const lightConstant = JsToCppConst(value);
    let darkConstant = `mixer[${key}]`;
    if (darkMapping[key]) {
      darkConstant = JsToCppConst(lightMapping[key]);
    }
    content[key] =
      `mixer[${key}] = dark_mode ? ${darkConstant} : ${lightConstant};`;
  }
}

// write to file
let string = '';
for (const [key, value] of Object.entries(content)) {
  string += `${value}\n`;
}
fs.writeFileSync(
  join(__dirname, './data/themeMappingsMultiPalette.cpp'),
  string,
  'utf8',
);
