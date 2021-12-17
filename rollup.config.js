import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve'
// import scss from 'rollup-plugin-scss'
// import postcss from 'postcss'
// import autoprefixer from 'autoprefixer'
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
    resolve(),
    typescript(),
    serve({
      contentBase: ['./'],
    }),
    // scss({
    //   output: false,
    //   include: [],
    //   processor: () => postcss([autoprefixer()]),
    // }),
  ],
};
