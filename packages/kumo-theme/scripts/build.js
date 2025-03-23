/* eslint-disable no-undef */
import esbuild from 'esbuild';
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
  .catch(() => process.exit(1));
