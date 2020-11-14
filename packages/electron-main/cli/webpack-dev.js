const baseopt = require('./webpack.config')
const paths = require('./path')

const devopt = {
    mode: 'development',
}

Object.assign(baseopt, devopt)

module.exports = baseopt
