const fs = require('fs')
const path = require('path')
const cp = require('child_process')
const os = require('os')

const plat = os.platform()
const webpack_src = path.join(__dirname, '..', 'node_modules', '.bin', 'webpack')
const opt_src = path.join(__dirname, '..', 'cli', 'webpack-dev.js')

if (plat === 'win32') {
    console.log('在windows上启动开发')
    const cdi = cp.exec(` start ${webpack_src} --config ${opt_src} --watch  `, (err, out, de) => {
        console.log(err)
        console.log(out)
        console.log(de)
    })
    setTimeout(() => {
        console.log('已经启动, 在新打开的cmd窗口有实时编译信息')
        process.exit(1)
    }, 1000)
}
