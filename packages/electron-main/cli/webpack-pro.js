const baseopt = require('./webpack.config')
const paths = require('./path')

const devopt = {
    mode: 'production',
}

Object.assign(baseopt, devopt)

module.exports = baseopt
