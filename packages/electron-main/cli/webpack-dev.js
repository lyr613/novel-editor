const baseopt = require('./webpack.config')
const paths = require('./path')

const devopt = {
    mode: 'development',
}

Object.assign(baseopt, devopt)
// 会报一个警告
baseopt.externals.push(/prettier/)

module.exports = baseopt
