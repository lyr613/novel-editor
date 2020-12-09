const util = require('./util')

const opts = [
    {
        src: util.paths().root,
        log: '安装 顶层 依赖包',
        cmd: 'yarn',
    },
    {
        src: util.paths().front,
        log: '安装 页面 依赖包',
        cmd: 'yarn',
    },
    {
        src: util.paths().elec,
        log: '安装 elec 依赖包',
        cmd: 'yarn',
    },
    {
        src: util.paths().pub,
        log: '安装 公共 依赖包',
        cmd: 'yarn',
    },
]
util.link_run_cmds(opts)
