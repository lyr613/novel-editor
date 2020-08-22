const webpack = require('webpack')
const path = require('path')
const DllPlugin = require('webpack/lib/DllPlugin')
const vendors = ['react', 'react-dom', 'react-router', 'echarts', 'rxjs', 'react-error-overlay', '@antv/g6']

module.exports = {
    mode: 'production',
    entry: {
        dll: vendors,
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '..', 'public'),
        library: '__[name]__lib',
    },
    plugins: [
        new DllPlugin({
            name: '__[name]__lib',
            path: path.join(__dirname, '..', 'dll-build', '[name].manifest.json'),
        }),
    ],
}
