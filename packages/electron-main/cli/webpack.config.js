const paths = require('./path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    entry: paths.webpack_entry,
    output: {
        filename: 'elecapp.js',
        path: paths.webpack_output,
        library: 'elecapp',
        libraryTarget: 'umd',
    },
    target: 'electron-main',
    module: {
        rules: [
            {
                test: /\.(woff|woff2|eot|ttf|otf|node)$/,
                use: ['file-loader'],
            },
            {
                test: /\.ts$/,
                use: ['ts-loader'],
            },
        ],
    },
    resolve: {
        fallback: {
            path: require.resolve('path-browserify'),
            os: require.resolve('os-browserify/browser'),
            stream: require.resolve('stream-browserify'),
        },
    },
    plugins: [
        //
        new CleanWebpackPlugin(),
    ],
    externals: [
        //
        'sharp',
    ],
}
