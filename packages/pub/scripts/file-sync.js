const fs = require('fs')
const path = require('path')
const paths = require('../paths')
const dayjs = require('dayjs')

console.log(`
文件同步
读取opts配置
自动取files中最后修改的文件
`)

const electp = path.join(paths.elec, 'src', 'type-')
const frontp = path.join(paths.front, 'src', 'type-')

/** 要同步的文件配置
 * 如果刚创建, 写到arr[0]的位置
 */
const opts = [
    {
        /** 自动取最后修改的文件 */
        files: [path.join(electp, 'fs.d.ts'), path.join(frontp, 'fs.d.ts')],
        /** 打印此标题 */
        title: '类型 fs',
    },
    {
        files: [path.join(electp, 'option.d.ts'), path.join(frontp, 'option.d.ts')],
        title: '类型 option',
    },
    {
        files: [path.join(frontp, 'book.d.ts'), path.join(electp, 'book.d.ts')],
        title: '类型 book',
    },
]

opts.forEach((opt) => {
    copy_one_opt(opt)
})

function copy_one_opt(opt) {
    console.log('开始', opt.title)
    const files = opt.files
    let last = files[0]
    files.forEach((file) => {
        if (!fs.existsSync(file)) {
            return
        }
        const t0 = fs.statSync(last).atime
        const t2 = fs.statSync(file).atime
        // console.log(dayjs(t0).format('YYYY-MM-DD HH:mm:ss'))
        // console.log(dayjs(t2).format('YYYY-MM-DD HH:mm:ss'))
        if (dayjs(t0).isBefore(t2)) {
            // console.log(0, '早于', 2)
            last = file
        }
    })
    console.log('最后修改: ', last)
    const rest = files.filter((it) => it !== last)
    rest.forEach((tar) => {
        fs.copyFileSync(last, tar)
    })
    console.log('-')
}

console.log('end')
