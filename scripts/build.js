const util = require('./util')
const path = require('path')

const opts = [
    {
        src: util.paths().front,
        log: '打包 页面',
        cmd: ' node scripts/build.js ',
    },
    {
        src: util.paths().elec,
        log: ' 打包 壳 ',
        cmd: ' node ./scripts/build.js ',
    },
]
util.link_run_cmds(opts)
