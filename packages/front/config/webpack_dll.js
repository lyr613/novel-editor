const webpack = require('webpack')
const path = require('path')
// const vendors = ['react', 'react-dom', 'react-router', 'rxjs', 'rxjs/operators', '@fluentui/react']
const vendors_dev = ['react', 'react-dom']
const vendors_pro = ['rxjs', 'rxjs/operators']

// 现在一些需要dev, 一些需要pro
module.exports = [mk('development'), mk('production')]

/**
 *
 * @param {'development' | 'production'} type
 */
function mk(type) {
    const re = {
        mode: type,
        entry: {
            dll: vendors_dev,
        },
        resolve: {
            extensions: ['.js', '.jsx', '.json'],
        },
        output: {
            filename: `[name]-${type}.js`,
            path: path.resolve(__dirname, '..', 'public'),
            library: `__[name]__${type}lib`,
        },
        plugins: [
            new webpack.DllPlugin({
                name: `__[name]__${type}lib`,
                path: path.join(__dirname, '..', 'dll-build', `[name]${type}.m.json`),
                entryOnly: false,
                context: path.join(__dirname, '..'),
            }),
        ],
        performance: {
            maxAssetSize: 3000000,
            maxEntrypointSize: 5000000,
        },
    }
    if (type === 'development') {
        re.entry.dll = vendors_dev
    } else {
        re.entry.dll = vendors_pro
    }
    return re
}
