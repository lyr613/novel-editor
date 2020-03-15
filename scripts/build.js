const path = require('path')
const fs = require('fs-extra')
const cp = require('child_process')

const root = path.resolve(__dirname, '..', 'packages')
const page = path.resolve(root, 'view')
const elec = path.resolve(root, 'elec')

main()

function main() {
    clean()
    build_page()
    build_elec()
    console.log('all - end')
}

function clean() {
    console.log('开始清理')
    const dirs = ['build', 'build-page', 'build-final']
    const projects = [page, elec]
    for (const project of projects) {
        for (const dir of dirs) {
            const now_dir = path.join(project, dir)
            console.log('..', now_dir)
            if (!fs.existsSync(now_dir)) {
                continue
            }
            fs.emptyDirSync(now_dir)
            fs.removeSync(now_dir)
        }
    }
    console.log('清理结束')
}

function build_page() {
    console.log('开始打包page')
    cp.execSync(` cd ${page} && yarn build `)
}

function build_elec() {
    console.log('开始打包elec')
    cp.execSync(` cd ${elec} && yarn electron-build `)
}
