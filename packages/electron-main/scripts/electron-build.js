const path = require('path')
const os = require('os')
const cp = require('child_process')

const electron_bin = path.resolve(__dirname, '..', 'node_modules', '.bin', 'electron-builder')
const work_place = path.resolve(__dirname, '..')
const platform = os.platform()

const shell = electron_bin

const cps = cp.exec(shell)
const sot = cps.stdout
sot.on('data', (ck) => {
    console.log(ck)
})
