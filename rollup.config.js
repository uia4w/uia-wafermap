const definition = require("./package.json");
const dependencies = Object.keys(definition.dependencies || {});

import nodeResolve from '@rollup/plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';

export default {
  input: "index.js",
  external: dependencies,
  output: {
    extend: true,
    file: `dist/${definition.name}.js`,
    format: "umd",
    globals: { "d3-selection": "d3" },
    name: "uia"
  },
  plugins: [ 
    builtins(),
    nodeResolve()
]
};
