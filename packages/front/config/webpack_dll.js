const webpack = require('webpack')
const path = require('path')
// const vendors = ['react', 'react-dom', 'react-router', 'rxjs', 'rxjs/operators', '@fluentui/react']
// 现在加入react会影响热更新, 无法看到修改的结果
const vendors = ['rxjs', 'rxjs/operators']

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
            path: path.join(__dirname, '..', 'dll-build', '[name].m.json'),
            entryOnly: false,
            context: path.join(__dirname, '..'),
        }),
    ],
    performance: {
        maxAssetSize: 3000000,
        maxEntrypointSize: 5000000,
    },
}
