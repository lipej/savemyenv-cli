const { build } = require("esbuild");
const { Generator } = require("npm-dts");
const { dependencies } = require("./package.json");

const entryFile = "lib/index.ts";

const shared = {
  entryPoints: [entryFile],
  bundle: true,
  platform: "node",
};

build({
  ...shared,
  outfile: "dist/index.js",
});

build({
  ...shared,
  outfile: "dist/index.esm.js",
  format: "esm",
});

new Generator({
  entry: entryFile,
  output: "dist/index.d.ts",
}).generate();
