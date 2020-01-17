const definition = require("./package.json");
const dependencies = Object.keys(definition.dependencies || {});

export default {
  input: "index",
  external: dependencies,
  output: {
    extend: true,
    file: `dist/${definition.name}.js`,
    format: "umd",
    globals: { "d3-selection": "d3" },
    name: "uia"
  }
};
