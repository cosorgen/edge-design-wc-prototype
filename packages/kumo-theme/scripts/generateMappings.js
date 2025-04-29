/* eslint-disable @typescript-eslint/no-unused-vars */
/* global console */
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const kumoThemes = await import('../dist/esm/index.js');

// Clean and make dist directory
const distDir = join(__dirname, './dist');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Generate theme mapping
const { lightTheme, darkTheme, GenerateAllPalettes } = kumoThemes;
const seedColor = '#FFFF00'; // Yellow
const palettes = GenerateAllPalettes(seedColor);

// Light value mapping
const lightThemeColored = lightTheme(seedColor);
const lightMapping = {};
for (const themeKey of Object.keys(lightThemeColored)) {
  const value = lightThemeColored[themeKey];

  const neutralTone = Object.entries(palettes.tonal.neutral).find(
    ([k, v]) => v === value,
  );
  if (neutralTone && !(themeKey in lightMapping)) {
    lightMapping[themeKey] = `tonal.neutral.tone(${neutralTone[0]})`;
  }

  const vibrantTone = Object.entries(palettes.tonal.primary).find(
    ([k, v]) => v === value,
  );
  if (vibrantTone && !(themeKey in lightMapping)) {
    lightMapping[themeKey] = `tonal.primary.tone(${vibrantTone[0]})`;
  }

  const valueSolid = value.substring(0, 7);
  const shadowTone = Object.entries(palettes.tonal.primary).find(
    ([k, v]) => v === valueSolid,
  );
  if (shadowTone && !(themeKey in lightMapping)) {
    let opacity = (parseInt(value.substring(7, 9), 16) / 255).toFixed(2);
    lightMapping[themeKey] = `tonal.primary.tone(12).opacity(${opacity})`;
  }

  // Check for custom color overrides
  for (const variant of Object.keys(palettes.tonal)) {
    const tone = Object.entries(palettes.tonal[variant]).find(
      ([k, v]) => v === value,
    );
    if (tone && !(themeKey in lightMapping)) {
      console.log(`Check light ${themeKey}`);
      lightMapping[themeKey] = `tonal.${variant}.tone(${tone[0]})`;
    }
  }
}

fs.writeFileSync(
  join(__dirname, './data/lightThemeMapping.json'),
  JSON.stringify(lightMapping, null, 2),
);

// Dark value mapping
const darkThemeColored = darkTheme(seedColor);
const darkMapping = {};
for (const themeKey of Object.keys(darkThemeColored)) {
  const value = darkThemeColored[themeKey];

  const neutralTone = Object.entries(palettes.tonal.neutralVariant).find(
    ([k, v]) => v === value,
  );
  if (neutralTone && !(themeKey in darkMapping)) {
    darkMapping[themeKey] = `tonal.neutralVariant.tone(${neutralTone[0]})`;
  }

  const vibrantTone = Object.entries(palettes.tonal.primary).find(
    ([k, v]) => v === value,
  );
  if (vibrantTone && !(themeKey in darkMapping)) {
    darkMapping[themeKey] = `tonal.primary.tone(${vibrantTone[0]})`;
  }

  // Check for custom color overrides
  for (const variant of Object.keys(palettes.tonal)) {
    const tone = Object.entries(palettes.tonal[variant]).find(
      ([k, v]) => v === value,
    );
    if (tone && !(themeKey in darkMapping)) {
      console.log(`Check dark ${themeKey}`);
      darkMapping[themeKey] = `tonal.${variant}.tone(${tone[0]})`;
    }
  }
}

fs.writeFileSync(
  join(__dirname, './data/darkThemeMapping.json'),
  JSON.stringify(darkMapping, null, 2),
  { overwrite: true },
);
