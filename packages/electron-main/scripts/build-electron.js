const o = require('./build-funcs')
const path = require('path')
const fs = require('fs-extra')

main()

async function main() {
    await o.electron_build()
    o.open_dir()
    clear()
}

function clear() {
    const src1 = path.join(__dirname, '..', 'build-page')
    fs.emptyDirSync(src1)
}
