// import webpack from 'webpack'

const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin')
// import { Configuration } from 'webpack'

/**
 * @type {Configuration}
 */
const cfg = {
    // const cfg:Configuration = {
    /** development production */
    mode: 'production',
    entry: {
        index: './src/index.ts',
        // vender: ['font-list'],
    },
    resolve: {
        extensions: ['.ts', '.js', '.yml', '.xml', '.json', '.vbs', '.*'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },

        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
        plugins: [new DirectoryNamedWebpackPlugin()],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
    },
    target: 'electron-main',
    module: {
        unknownContextCritical: false,
        exprContextCritical: false,
        noParse: /prettier\/parser-typescript/,
        rules: [
            {
                oneOf: [
                    {
                        test: /\.ts$/,
                        use: 'ts-loader',
                        exclude: /node_modules/,
                    },
                    {
                        loader: 'file-loader',
                        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                        options: {
                            name: 'static/[path][name].[ext]',
                            // name: 'static/[name].[hash:8].[ext]',
                        },
                    },
                ],
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
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
    },
}
module.exports = cfg
