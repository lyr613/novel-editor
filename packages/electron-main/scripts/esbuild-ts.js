const path = require('path')
const cp = require('child_process')
const worker = path.join(__dirname, '..', 'node_modules', '.bin', 'esbuild')

const src_source = path.join(__dirname, '..', 'src', 'app.ts')
const src_target = path.join(__dirname, '..', 'build', 'elecapp.js')

cp.exec(` ${worker} ${src_source}  --bundle --platform=node --external:electron --minify --outfile=${src_target} `)
