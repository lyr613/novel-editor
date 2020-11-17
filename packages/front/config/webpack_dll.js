const webpack = require('webpack')
const path = require('path')
const vendors = [
    'react',
    'react-dom',
    'react-router',
    'react-error-overlay',
    'rxjs',
    'rxjs/operators',
    '@fluentui/react',
]
// const vendors = ['rxjs']
module.exports = {
    mode: 'production',
    entry: {
        dll: vendors,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '..', 'public'),
        library: '__[name]__lib',
    },
    plugins: [
        new webpack.DllPlugin({
            name: '__[name]__lib',
            path: path.join(__dirname, '..', 'dll-build', '[name].manifest.json'),
            entryOnly: false,
            context: path.join(__dirname, '..'),
        }),
    ],
    performance: {
        maxAssetSize: 3000000,
        maxEntrypointSize: 5000000,
    },
}
