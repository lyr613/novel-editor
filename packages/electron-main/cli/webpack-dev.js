const baseopt = require('./webpack.config')
const paths = require('./path')

const devopt = {
    mode: 'development',
    output: {
        filename: 'elecapp.js',
        path: paths.webpack_watch,
        library: 'elecapp',
        libraryTarget: 'umd',
    },
}

Object.assign(baseopt, devopt)

module.exports = baseopt
