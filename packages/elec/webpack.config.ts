const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')
// import { Configuration } from 'webpack'

/**
 * {Configuration}
 */
const cfg = {
    // const cfg:Configuration = {
    /** development production */
    mode: 'production',
    entry: {
        root: './src/index.ts',
    },
    resolve: {
        extensions: ['.ts', '.js', '.yml', '.xml', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },

        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        plugins: [new DirectoryNamedWebpackPlugin()],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'build'),
    },
    target: 'electron-main',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            root: __dirname,
            verbose: true,
            dry: false,
        }),
    ],
}
module.exports = cfg
