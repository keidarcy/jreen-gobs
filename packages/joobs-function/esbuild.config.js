const esbuild = require('esbuild');

// Automatically exclude all node_modules from the bundled version
// const { nodeExternalsPlugin } = require('esbuild-node-externals');

(async function build() {
  const results = await esbuild.build({
    entryPoints: ['./src/add.ts', './src/hello.ts'],
    outdir: 'dist',
    // bundle: true,
    platform: 'node',
    // minify: true,
    // sourcemap: true,
    target: 'es2015',
    // plugins: [nodeExternalsPlugin()],
    watch: true,
  });
  console.log('results:', results);
})();
