const path = require('path')
const os = require('os')
const cp = require('child_process')
const ds = require('./do-shell')

// 使用npx在windows上有bug
let shell = ''

const worker = path.resolve('.', 'node_modules', '.bin', 'electron')
const platform = os.platform()

if (platform === 'win32') {
    shell = `chcp 65001 && ${worker} .`
} else {
    shell = `${worker} .`
}

ds.do_shell_with_log(shell)
