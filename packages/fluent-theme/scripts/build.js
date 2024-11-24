/* eslint-disable no-undef */
import esbuild from 'esbuild';
import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

esbuild
  .build({
    entryPoints: {
      index: join(__dirname, '../src/index.ts'),
    },
    bundle: true,
    format: 'esm',
    target: 'esnext',
    sourcemap: 'external',
    tsconfig: 'tsconfig.build.json',
    outdir: join(__dirname, '../dist/esm'),
  })
  .then(async () => {
    const themes = await import('../dist/esm/index.js');

    // Get original export list
    const exportList = [];
    const exportMatches = fs
      .readFileSync(join(__dirname, '../dist/esm/index.js'), 'utf8')
      .match(/export\s*{.+};/s)[0]
      .matchAll(/^\s+(.+[^,]),?$/gm);

    for (const match of exportMatches) {
      exportList.push(match[1]);
    }

    // Remove original export from ../dist/esm/index.js
    fs.writeFileSync(
      join(__dirname, '../dist/esm/index.js'),
      fs
        .readFileSync(join(__dirname, '../dist/esm/index.js'), 'utf8')
        .replace(/export\s*{.+};\n/s, ''),
    );

    // Generate individual tokens
    const { tokens } = themes;
    let individualTokenVars = '\n// Individual tokens auto-generated\n';
    let individualTokenTypes = '\n// Individual tokens auto-generated\n';
    for (const key in tokens) {
      individualTokenVars += `var ${key} = '${tokens[key]}';\n`;
      individualTokenTypes += `export declare const ${key}: string;\n`;
      exportList.push(key);
    }

    // append individual tokens to ../dist/esm/index.js
    fs.appendFileSync(
      join(__dirname, '../dist/esm/index.js'),
      individualTokenVars,
    );

    // append individual token types to ../dist/dts/index.d.ts
    fs.appendFileSync(
      join(__dirname, '../dist/dts/index.d.ts'),
      individualTokenTypes,
    );

    // append new export to ../dist/esm/index.js
    fs.appendFileSync(
      join(__dirname, '../dist/esm/index.js'),
      `\nexport {${exportList.map((exp) => `\n  ${exp}`)}\n};\n`,
    );
  })
  .catch(() => process.exit(1));
