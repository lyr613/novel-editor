const path = require('path')
const cp = require('child_process')

const pkgsrc = path.join(__dirname, '..', 'packages')

main()

async function main() {
    const root = path.join(pkgsrc, '..')
    const front = path.join(pkgsrc, 'front')
    const elec = path.join(pkgsrc, 'electron-main')

    const funcs = [root, front, elec].map(mk_ins)

    for await (const func of funcs) {
        await func()
    }
}

function mk_ins(ins_src) {
    return () =>
        new Promise((suc) => {
            console.log('----')
            console.log('开始安装 ', ins_src)
            const cd1 = cp.exec(' yarn ', {
                cwd: ins_src,
            })
            cd1.stdout.on('data', (msg) => {
                console.log(msg)
            })
            cd1.on('close', () => {
                suc()
            })
        })
}
