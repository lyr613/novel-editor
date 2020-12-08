const path = require('path')
const cp = require('child_process')

/**
 *
 * @param {any} opt {src, cmd, log}
 */
function mk_cp_runner(opt) {
    return () =>
        new Promise((suc) => {
            console.log('========')
            console.log(opt.log)
            const cd1 = cp.exec(opt.cmd, {
                cwd: opt.src,
            })
            cd1.stdout.on('data', (msg) => {
                console.log(msg)
            })
            cd1.on('close', () => {
                suc()
            })
        })
}
/**
 *
 * @param {any} opts {src, cmd, log}[]
 */
async function link_run_cmds(opts) {
    const funcs = opts.map(mk_cp_runner)
    for await (const func of funcs) {
        await func()
    }
}

function paths() {
    const root = path.join(__dirname, '..')
    return {
        root,
        pkg_root: path.join(root, 'packages'),
        front: path.join(root, 'packages', 'front'),
        elec: path.join(root, 'packages', 'electron-main'),
    }
}

module.exports = {
    paths,
    link_run_cmds,
}
