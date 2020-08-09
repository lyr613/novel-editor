const fs = require('fs-extra')
const path = require('path')

const tar_src = path.join(__dirname, '..', '..', 'elec', 'build-page')
const sor_src_old = path.join(__dirname, '..', 'build')
const sor_src = path.join(__dirname, '..', 'build-page')

if (fs.existsSync(tar_src)) {
    fs.emptyDirSync(tar_src)
    fs.rmdirSync(tar_src)
}

if (fs.existsSync(sor_src)) {
    fs.emptyDirSync(sor_src)
    fs.rmdirSync(sor_src)
}
fs.renameSync(sor_src_old, sor_src)

fs.moveSync(sor_src, tar_src)
