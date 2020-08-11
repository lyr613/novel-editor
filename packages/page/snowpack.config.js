const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
    extends: '@snowpack/app-scripts-react',
    plugins: [
        [
            '@snowpack/plugin-webpack',
            {
                extendConfig: (config) => {
                    config.plugins.push(
                        new MonacoWebpackPlugin({
                            languages: [],
                        }),
                    )
                    return config
                },
            },
        ],
    ],
    devOptions: {
        port: 7098,
    },
    alias: {
        '@': './src',
    },
    install: [],
    installOptions: {
        rollup: {
            plugins: [require('rollup-plugin-node-polyfills')()],
        },
    },
}
