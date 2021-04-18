const o = require('./build')

main()

async function main() {
    await o.electron_build()
    o.open_dir()
}
