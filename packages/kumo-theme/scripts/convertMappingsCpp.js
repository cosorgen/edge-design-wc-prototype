/* eslint-disable @typescript-eslint/no-unused-vars */
/* global console */

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Helper function to convert JS class chain to C++ constant
function JsToCppConst(string) {
  let out = '';
  const parts = string.split('.');
  const palette = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  const variant = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);
  const tone = parts[2].replace('tone(', '').replace(')', '');
  out = `k${palette}${variant}${tone}`;
  // Adjust opacity
  if (parts[3]) {
    const opacity = parseInt(
      parseFloat(
        parts[3].replace('opacity(', '') + '.' + parts[4].replace(')', ''),
      ) * 255,
    );
    out = `SetAlpha(${out}, 0x${opacity.toString(16)})`;
  }
  return out;
}

// Helper function to convert JS class chain to single palette C++ constant
function paletteToChroma(string) {
  const paletteToChroma = {
    Vibrant: {
      primary: '200',
      secondary: '24',
      tertiary: '32',
      neutral: '8',
      neutralVariant: '12',
    },
    Neutral: {
      primary: '12',
      secondary: '8',
      tertiary: '16',
      neutral: '2',
      neutralVariant: '2',
    },
    Expressive: {
      primary: '40',
      secondary: '24',
      tertiary: '32',
      neutral: '8',
      neutralVariant: '12',
    },
  };
  let out = '';
  const parts = string.split('.');
  const palette = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  const variant = parts[1];
  const tone = parts[2].replace('tone(', '').replace(')', '');
  if (palette === 'Tonal') {
    out = `palette->${variant}().get(${tone})`;
  } else {
    out = `Hct(palette->${variant}().get(${tone})).set_chroma(${paletteToChroma[palette][variant]}).ToInt()`;
  }

  // Adjust opacity
  if (parts[3]) {
    const opacity = parseInt(
      parseFloat(
        parts[3].replace('opacity(', '') + '.' + parts[4].replace(')', ''),
      ) * 255,
    );
    out = `SetAlpha(${out}, 0x${opacity.toString(16)})`;
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
const { legacyCommonTokens, legacyDarkTokens, legacyLightTokens } =
  await import('../dist/esm/index.js');
const legacyKeys = Object.keys({
  ...legacyCommonTokens,
  ...legacyDarkTokens,
  ...legacyLightTokens,
});

// Generate cpp for multi palette
let content = {};
for (const [key, value] of Object.entries(darkMapping)) {
  const darkConstant = JsToCppConst(value);
  let lightConstant = `mixer[${key}]`;
  if (lightMapping[key]) {
    lightConstant = JsToCppConst(lightMapping[key]);
  }
  content[key] =
    `mixer[${key}] = {dark_mode ? ${darkConstant} : ${lightConstant}};`;
}
// Check light for missing keys
for (const [key, value] of Object.entries(lightMapping)) {
  if (!(key in content)) {
    const lightConstant = JsToCppConst(value);
    let darkConstant = `mixer[${key}]`;
    if (darkMapping[key]) {
      darkConstant = JsToCppConst(lightMapping[key]);
    }
    content[key] =
      `mixer[${key}] = {dark_mode ? ${darkConstant} : ${lightConstant}};`;
  }
}

// Sort by legacy keys
let legacyContent = {};
for (const key of legacyKeys) {
  if (key in content) {
    const value = content[key];
    delete content[key];
    legacyContent[key] = value;
  }
}
content = {
  ...content,
  ['spacer']: '\n//Phoenix tokens',
  ...legacyContent,
};

// write to file
let string = '';
for (const value of Object.values(content)) {
  string += `${value}\n`;
}
fs.writeFileSync(
  join(__dirname, './data/themeMappingsMultiPalette.cc'),
  string,
  'utf8',
);

// Generate cpp for single palette
content = {};
for (const [key, value] of Object.entries(darkMapping)) {
  const darkConstant = paletteToChroma(value);
  let lightConstant = `mixer[${key}]`;
  if (lightMapping[key]) {
    lightConstant = paletteToChroma(lightMapping[key]);
  }
  content[key] =
    `mixer[${key}] = {dark_mode ? ${darkConstant} : ${lightConstant}};`;
}
// Check light for missing keys
for (const [key, value] of Object.entries(lightMapping)) {
  if (!(key in content)) {
    const lightConstant = paletteToChroma(value);
    let darkConstant = `mixer[${key}]`;
    if (darkMapping[key]) {
      darkConstant = paletteToChroma(lightMapping[key]);
    }
    content[key] =
      `mixer[${key}] = {dark_mode ? ${darkConstant} : ${lightConstant}};`;
  }
}

// Sort by legacy keys
legacyContent = {};
for (const key of legacyKeys) {
  if (key in content) {
    const value = content[key];
    delete content[key];
    legacyContent[key] = value;
  }
}
content = {
  ...content,
  ['spacer']: '\n//Phoenix tokens',
  ...legacyContent,
};

// write to file
string = '';
for (const value of Object.values(content)) {
  string += `${value}\n`;
}
fs.writeFileSync(
  join(__dirname, './data/themeMappingsChroma.cc'),
  string,
  'utf8',
);
