const es = require('esbuild')

es.build({
    entryPoints: [require('../cli/path').webpack_entry],
    bundle: true,
    outfile: require('../cli/path').esbuild_output,
})
