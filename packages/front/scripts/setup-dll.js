const fs = require('fs')
const path = require('path')
const cp = require('child_process')
const os = require('os')

setup_dll()

function setup_dll() {
    return new Promise((res) => {
        console.log('---')
        console.log('开始 setup dll ')
        console.log('---')
        const webpack_src = path.join(__dirname, '..', 'node_modules', '.bin', 'webpack')
        const opt_src = path.join(__dirname, '..', 'config', 'webpack_dll.js')

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
