const fs = require('fs-extra')
const path = require('path')

const pkg_src = path.join(__dirname, '..', 'packages')
const re_src = path.join(__dirname, '..', 'project-report', '代码量统计.txt')

const type_infors_hash = new Map()

main()

function main() {
    init()
    const elec = path.join(pkg_src, 'elec', 'src')
    const view = path.join(pkg_src, 'view', 'src')
    count('elec', elec)
    count('view', view)
    report()
}

function init() {
    const dir = path.join(re_src, '..')
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }
    fs.writeFileSync(re_src, '')
}

function count(package, src) {
    let buffer = [src]
    const infors = []

    while (buffer.length) {
        const next_line = []
        buffer.forEach((x) => {
            const t = fs.statSync(x)
            if (t.isDirectory()) {
                const cld = fs.readdirSync(x).map((cldsrc) => path.join(x, cldsrc))
                next_line.push(...cld)
            } else {
                let ftype = ''
                if (x.match(/.test.tsx$/)) {
                    ftype = 'test'
                } else if (x.match(/.tsx$/)) {
                    ftype = 'tsx'
                } else if (x.match(/.ts$/)) {
                    ftype = 'ts'
                } else if (x.match(/.s?css$/)) {
                    ftype = 'css'
                }
                if (ftype) {
                    const count = fs.readFileSync(x, 'utf-8').replace(/\s/g, '').length
                    const infor = {
                        count,
                        ftype,
                        src: x,
                    }
                    infors.push(infor)
                }
            }
        })
        buffer = next_line
        // console.log(next_line)
    }
    type_infors_hash.set(package, infors)
}

function report() {
    let tarr = []
    let all_count = 0

    type_infors_hash.forEach((infors, pkg) => {
        tarr.push(`----${pkg}----`)
        const type_count_hash = new Map()
        infors.forEach((info) => {
            const tcount = type_count_hash.get(info.ftype) || 0
            type_count_hash.set(info.ftype, tcount + info.count)
            all_count += info.count
        })
        type_count_hash.forEach((count, type) => {
            tarr.push(`${type} ${count}`)
        })
        tarr.push('\n')
    })
    tarr.unshift(`总字符数 ${all_count}\n`)

    // 每个文件
    tarr.push('单个文件统计')
    type_infors_hash.forEach((infors, pkg) => {
        tarr.push(`----${pkg}----`)
        infors.sort((a, b) => {
            return b.count - a.count
        })
        infors.forEach((info) => {
            tarr.push(`${info.count} ${info.src}`)
        })
        tarr.push('\n')
    })

    const txt = tarr.join('\n')
    fs.appendFileSync(re_src, txt)
}

function tap(use_src) {
    const hash_src_count = new Map()
    const hash_type_count = new Map()
    let max_path_length = 0

    count()
    report()

    function count() {
        let buffer = [use_src]

        while (buffer.length) {
            const next_line = []
            buffer.forEach((x) => {
                const t = fs.statSync(x)
                if (t.isDirectory()) {
                    const cld = fs.readdirSync(x).map((cldsrc) => path.join(x, cldsrc))
                    next_line.push(...cld)
                } else {
                    let ext = ''
                    if (x.match('test.tsx')) {
                        ext = 'test'
                    } else {
                        ext = path.extname(x).replace(/./, '')
                    }

                    if (['ts', 'tsx', 'scss', 'test'].includes(ext)) {
                        const count = fs.readFileSync(x, 'utf-8').replace(/\s/g, '').length
                        hash_src_count.set(x, count)
                        const has = hash_type_count.get(ext) || 0
                        hash_type_count.set(ext, has + count)
                        max_path_length = Math.max(max_path_length, x.length)
                    }
                }
            })
            buffer = next_line
            // console.log(next_line)
        }
    }

    function report() {
        let tarr = []

        const first_line = path.basename(path.join(use_src, '..'))
        tarr.push(`----${first_line}----`)
        tarr.push('类型统计非空字符数')
        hash_type_count.forEach((count, type) => {
            console.log(type, count)
            tarr.push(`${type}  ${count}`)
        })
        tarr.push('\n每个文件非空字符数')
        hash_src_count.forEach((count, path) => {
            console.log(path, count)
            const padlen = max_path_length - path.length
            tarr.push(`${path}${' '.repeat(padlen)} ${count}`)
        })
        const txt = tarr.join('\n') + '\n\n\n\n'
        fs.appendFileSync(re_src, txt)
    }
}
