const fs = require('fs')
const path = require('path')
const cp = require('child_process')
const os = require('os')

function webpack_build() {
    return new Promise((res) => {
        console.log('---')
        console.log('开始 webpack 打包')
        console.log('---')
        const webpack_src = path.join(__dirname, '..', 'node_modules', '.bin', 'webpack')
        const opt_src = path.join(__dirname, '..', 'cli', 'webpack-pro.js')

        const cdi = cp.exec(`  ${webpack_src} --config ${opt_src}  `)
        cdi.stdout.on('data', (msg) => {
            console.log(msg)
        })
        cdi.on('close', () => {
            setTimeout(() => {
                res()
            }, 1000)
        })
    })
}

function electron_build() {
    return new Promise((res) => {
        console.log('---')
        console.log('开始 electron 打包')
        console.log('---')
        const electron_bin = path.resolve(__dirname, '..', 'node_modules', '.bin', 'electron-builder')
        const cdi = cp.exec(electron_bin)
        cdi.stdout.on('data', (msg) => {
            console.log(msg)
        })
        cdi.on('close', () => {
            setTimeout(() => {
                res()
            }, 1000)
        })
    })
}

function open_dir() {
    return new Promise((res) => {
        const src = path.join(__dirname, '..', 'build-final')
        if (os.platform() === 'win32') {
            cp.exec(`start ${src}`)
        } else {
            cp.exec(`open ${src}`)
        }
    })
}

module.exports = {
    webpack_build,
    electron_build,
    open_dir,
}
