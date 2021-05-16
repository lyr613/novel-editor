const o = require('./build-funcs')

main()

async function main() {
    await o.electron_build()
    o.open_dir()
}
