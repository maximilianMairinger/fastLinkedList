import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonJS from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
const {terser} = require('rollup-plugin-terser')


export default {
  input: 'repl/src/repl.ts',
  
  output: {
    file: 'repl/dist/fastLinkedList-repl.js',
    format: 'cjs',
    sourcemap: "inline"
  },
  plugins: [
    typescript({tsconfig: "./tsconfig.dev.json", noEmitOnError: false, sourceMap: true}), 
    resolve({browser: true}),
    commonJS({
      include: 'node_modules/**'
    }),
    json()
  ]
};
