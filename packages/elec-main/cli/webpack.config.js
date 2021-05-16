const paths = require('./path')
const path = require('path')
/** 编译时清空原来的 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
/** 自动查找文件夹下的index.ts */
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')

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
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|node)$/,
                use: ['file-loader'],
            },
        ],
    },
    resolve: {
        mainFiles: ['index'],
        extensions: ['.ts', '.js', '.json'],
        modules: [paths.work_src, 'node_modules'],

        fallback: {
            path: require.resolve('path-browserify'),
            os: require.resolve('os-browserify/browser'),
            stream: require.resolve('stream-browserify'),
        },
        // plugins: [new DirectoryNamedWebpackPlugin()],
    },
    plugins: [
        //
        new CleanWebpackPlugin(),
    ],
    externals: [
        // 不会经过webpack
        /images/,
    ],
}
