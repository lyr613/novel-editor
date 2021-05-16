const path = require('path')
const os = require('os')
const cp = require('child_process')

// 使用npx在windows上有bug
let shell = ''

const electron_bin = path.resolve(__dirname, '..', 'node_modules', '.bin', 'electron')
const work_place = path.resolve(__dirname, '..')
const platform = os.platform()

if (platform === 'win32') {
    // 在系统设置中可以配置为utf-8, 这里就不需要chcp 65001, 但是这回引发一些软件的bug
    // shell = `chcp 65001 && ${worker} .`
    shell = `chcp 65001 && ${electron_bin} ${work_place}`
} else {
    shell = `${electron_bin} ${work_place}`
}

const cps = cp.exec(shell)
const sot = cps.stdout
sot.on('data', (ck) => {
    console.log(ck)
})
