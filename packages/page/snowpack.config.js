module.exports = {
    extends: '@snowpack/app-scripts-react',
    plugins: [],
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
