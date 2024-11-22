/**
 * This script generates an index file for each component with variables that can be used
 * in css tag template literals (or any other .ts or .js file).
 */

/* global console */

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(path.dirname(__filename), '../');
const OUTPUT_DIR = 'dist';

function getCSSVar(name, fallback, prefix) {
  return `var(--${prefix ? `${prefix}-` : ''}${name}${fallback ? `, ${fallback}` : ''})`;
}

function getExportConst(dependency) {
  const startCSSString = `export const ${dependency.name} = "`;
  const endCSSString = `";\n`;
  let commentString = '';

  if (dependency.$comment) {
    commentString = `// ${dependency.$comment}\n`;
  }

  if (dependency.smtc) {
    if (dependency.ctrl) {
      return `${commentString}${startCSSString}${getCSSVar(dependency.smtc, getCSSVar(dependency.smtc, getCSSVar(dependency.f2), 'smtc'), 'ctrl')}${endCSSString}`;
    } else {
      return `${commentString}${startCSSString}${getCSSVar(dependency.smtc, getCSSVar(dependency.f2), 'smtc')}${endCSSString}`;
    }
  } else {
    return `${commentString}${startCSSString}${getCSSVar(dependency.f2)}${endCSSString}`;
  }
}

function getExportCSS(dependency) {
  const startCSSString = `export const ${dependency.name}Css = "`;
  const endCSSString = `";\n`;

  return `${startCSSString}--smtc-${dependency.smtc}: ${dependency.smtc_css}${endCSSString}`;
}

function buildFile(component) {
  const data = fs.readFileSync(
    path.resolve(__dirname, 'src', `${component}.json`),
    'utf-8',
  );
  const dependencies = JSON.parse(data);
  if (dependencies) {
    let content = '';
    const names = [];

    dependencies.forEach((dependency) => {
      if (dependency.extends) {
        content += buildFile(dependency.extends);
        return;
      }

      let name = dependency.name;

      if (names.includes(name)) {
        const err = new Error(`The name ${name} has already been used.`);
        console.error(err);
        throw err;
      }

      content += getExportConst(dependency);

      if (dependency.smtc_css) {
        content += getExportCSS(dependency);
      }

      names.push(name);
    });

    return content;
  } else {
    console.error(`No dependencies found for ${component}.json. Skipping...`);
  }
}

function writeFiles(component, content) {
  fs.writeFileSync(
    path.resolve(__dirname, OUTPUT_DIR, 'esm', `${component}.js`),
    content,
    { type: 'utf-8' },
  );

  // Convert to .d.ts file
  const dtsContent = content
    .replace(/export const/gm, 'export declare const')
    .replace(/\s=/gm, ':')
    .replace(/".+"/gm, 'string')
    .replace(/^\/\/.+\n/gm, '');

  // Write out component d.ts file
  fs.writeFileSync(
    path.resolve(__dirname, OUTPUT_DIR, 'dts', `${component}.d.ts`),
    dtsContent,
    { type: 'utf-8' },
  );
}

// Create out dir if it doesn't exist or else clean it
if (fs.existsSync(path.resolve(__dirname, OUTPUT_DIR))) {
  fs.rmSync(path.resolve(__dirname, OUTPUT_DIR), { recursive: true });
}
fs.mkdirSync(path.resolve(__dirname, OUTPUT_DIR));
fs.mkdirSync(path.resolve(__dirname, OUTPUT_DIR, 'esm'));
fs.mkdirSync(path.resolve(__dirname, OUTPUT_DIR, 'dts'));

// Get the list of component JSON files in src
const components = fs
  .readdirSync(path.resolve(__dirname, 'src'), {
    withFileTypes: true,
  })
  .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
  .map((file) => file.name.replace('.json', ''));

components.forEach((component) => {
  console.log(`Building ${component}...`);
  const fileContent = buildFile(component);
  writeFiles(component, fileContent);
});
