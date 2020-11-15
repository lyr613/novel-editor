const fs = require('fs')
const path = require('path')
const cp = require('child_process')
const os = require('os')

const plat = os.platform()
const webpack_src = path.join(__dirname, '..', 'node_modules', '.bin', 'webpack')
const opt_src = path.join(__dirname, '..', 'cli', 'webpack-dev.js')

if (plat === 'win32') {
    console.log('在windows上启动开发')
}
const cdi = cp.exec(`  ${webpack_src} --config ${opt_src} --watch  `, (err, out, de) => {
    // 这里三个打印都没用
    console.log(err)
    console.log(out)
    console.log(de)
})
cdi.stdout.on('data', (msg) => {
    console.log(msg)
})
