// import merge from 'deepmerge';
// import { createBasicConfig } from '@open-wc/building-rollup';
import typescript from '@rollup/plugin-typescript';
import serve from 'rollup-plugin-serve'
// import { babel } from '@rollup/plugin-babel';

const packageJson = require('./package.json');

export default {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'iife',
      sourcemap: true,
    }
  ],
  plugins: [
    // babel({ babelHelpers: 'bundled' }),
    typescript(),
    serve({
      contentBase: ['./'],
    }),
  ],
};
