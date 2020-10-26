// socketio错误
// Cannot find module 'socket.io-client/dist/socket.io.js'
// 路径问题
// 替换__dirname为固定路径, 打印发现无法获取
// "socket.io": "^2.3.0"

const fs = require('fs')
const path = require('path')

const fixsrc = path.join(__dirname, '../../..', 'node_modules')

const errfilesrc = path.join(fixsrc, 'socket.io/lib', 'index.js')

console.log(errfilesrc)
const txtarr = fs.readFileSync(errfilesrc, 'utf-8').split('\n')

const flinei = txtarr.findIndex((l) => l.match('__dirname'))

if (flinei > -1) {
    txtarr[flinei] = `var filepath = path.resolve('D:/workplace/9999-writer/webpackit/node_modules', file)`
}

const nexttxt = txtarr.join('\n')
fs.writeFileSync(errfilesrc, nexttxt)
