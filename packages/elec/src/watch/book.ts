import { ipcMain, shell, dialog } from 'electron'
import path from 'path'
import fs from 'fs'
import { reply, id32, check_did_install_git } from './util'
import { get_chapters } from '@/func/fs'

export function watch_book() {
    /** 根据路径列表读取书的信息 */
    ipcMain.on('load_books', load_books)
    /** 选择书的路径 */
    ipcMain.on('select_src', select_src)
    /** 设置书名 */
    ipcMain.on('book_set_name', book_set_name)
    /** 设置封面 */
    ipcMain.on('book_set_cover', book_set_cover)
    /** 搜索全文 */
    ipcMain.on('book_search_text', book_search_text)
    // 选择书目文件夹, 只返回路径, 进入章节时才会读取书目的信息
    ipcMain.on('book-new', (e) => {
        dialog
            .showOpenDialog({
                properties: ['openDirectory'],
            })
            .then((res) => {
                if (!res.filePaths.length) {
                    e.returnValue = false
                    return false
                }
                const src = res.filePaths[0]
                e.returnValue = load_book(src)
            })
    })
    /** 由路径列表获取书目列表 */
    ipcMain.on('book-load-srcs', (e, srcs) => {
        try {
            const re = srcs.map(load_book)
            e.reply('book-load-srcs', re)
            e.returnValue = re
        } catch (error) {
            e.reply('book-load-srcs', [])
            e.returnValue = []
        }
    })
}

/**
 *  根据路径列表读取书的信息
 * @param e
 * @param srcs 书路径
 */
function load_books(e: Electron.IpcMainEvent, srcs: string[]) {
    try {
        const has_git = check_did_install_git()
        const re: book[] = srcs.map((src) => {
            try {
                _safe_readme(src)
                const opt = _parse_readme(src)
                return {
                    id: id32(),
                    name: opt.name || path.basename(src),
                    src,
                    cover: find_cover(src),
                    git: has_git ? check_git(src) : false,
                }
            } catch (error) {
                return {
                    id: id32(),
                    name: '读取失败',
                    src,
                    cover: '',
                    git: false,
                }
            }
        })
        reply(e, 'load_books', re)
    } catch (error) {
        reply(e, 'load_books', [])
    }
    function find_cover(src: string) {
        try {
            const dsrc = path.join(src, 'doc')
            const files = fs.readdirSync(dsrc)
            const fi = files.find((str) => /^preview\.(png|jpg|gif)/.test(str))
            return fi ? path.join(dsrc, fi) : ''
        } catch (error) {
            return ''
        }
    }
    function check_git(src: string) {
        src = path.join(src, '.git', 'config')
        if (!fs.existsSync(src)) {
            return false
        }
        const txt = fs.readFileSync(src, 'utf-8')
        const has = /\[remote "origin"\]/.test(txt)
        return has
    }
    function find_name(src: string) {
        _safe_readme(src)
        return path.basename(src)
    }
}

/** 选择书的路径 */
function select_src(e: Electron.IpcMainEvent) {
    dialog
        .showOpenDialog({
            properties: ['openDirectory'],
        })
        .then((res) => {
            if (!res.filePaths.length) {
                reply(e, 'load_books', false)
                return false
            }
            const src = res.filePaths[0]
            reply(e, 'load_books', src)
        })
}

/**
 * 加载一本书
 * @param src
 */
function load_book(src: string) {
    return {
        id: Math.random(),
        name: path.basename(src),
        path: src,
        cover: find_cover(),
    }
    function find_cover() {
        const files = fs.readdirSync(src)
        const fi = files.find((str) => /^封面\.(png|jpg|gif)/.test(str))
        return fi ? path.resolve(src, fi) : ''
    }
}

/** 搜索全文 */
function book_search_text(e: Electron.IpcMainEvent, book_src: string, match_temp: string) {
    if (!book_src || !match_temp || !fs.existsSync(book_src)) {
        return
    }
    console.log('开始搜索', match_temp)

    try {
        const cps = get_chapters(book_src)
        const re: {
            chapter: any
            matchs: {
                node: any
                txts: string[]
                /** 相对总 节数的下标 */
                index: number
            }[]
        }[] = []
        /** 总 节数 */
        let node_count = 0
        /** 节点列表 */
        const nodes: {
            /** 是否被匹配了 */
            did_match: false
            [k: string]: string | boolean
        }[] = []
        cps.forEach((cp) => {
            const matchs: any[] = []
            cp.children.forEach((nd: any) => {
                try {
                    const src = path.join(book_src, 'chapters', nd.id + '.txt')
                    const txt = fs.readFileSync(src, 'utf-8')
                    nodes.push(nd)
                    if (txt.match(match_temp)) {
                        const tarr = txt.split('\n').filter(Boolean)
                        // 取前后两段
                        const fi = tarr.findIndex((v) => v.match(match_temp))
                        const si = Math.max(0, fi - 2)
                        const ei = Math.min(tarr.length, fi + 3)
                        const ret = tarr.slice(si, ei)
                        matchs.push({
                            node: nd,
                            txts: ret,
                            index: node_count,
                        })
                        nd.did_match = true
                    }
                    node_count++
                } catch (error) {}
            })
            if (matchs.length) {
                re.push({
                    chapter: cp,
                    matchs: matchs,
                })
            }
        })

        reply(e, 'book_search_text', re)
        // 继续做百分比展示
        const per_map = new Map<number, any>()
        nodes.forEach((nd, i) => {
            const per = ((i * 100) / node_count) | 0
            if (per_map.get(per)?.did_match) {
                return
            }
            per_map.set(per, nd)
        })

        reply(e, 'book_search_text_pers', Array.from(per_map.values()))
        console.log('搜索结果,', re.length, '条')
    } catch (error) {
        console.log('搜索失败')
    }
}

/** 保证readme文件存在 */
function _safe_readme(src: string) {
    const rs = path.join(src, 'readme.md')
    if (!fs.existsSync(rs)) {
        fs.writeFileSync(rs, '')
    }
}

interface readme {
    /** 书名 */
    name: string
    /** 封面 */
    cover: string
}
/** 解析readme内容 */
function _parse_readme(src: string): readme {
    const re = {
        name: '',
        /** 封面 */
        cover: '',
    }
    const rs = path.join(src, 'readme.md')
    const lines = fs
        .readFileSync(rs, 'utf-8')
        .split('\n')
        .filter((l) => !!l)

    // 书名
    const finame = lines.find((l) => /^# /.test(l))
    if (finame) {
        re.name = finame.replace(/[# ]/g, '')
    }
    return re
}

/** 设置书名 */
function book_set_name(e: Electron.IpcMainEvent, book_src: string, name: string) {
    try {
        _safe_readme(book_src)
        const rsrc = path.join(book_src, 'readme.md')
        const arr = fs.readFileSync(rsrc, 'utf-8').split('\n')
        const fi = arr.findIndex((l) => /^# /.test(l))
        if (fi > -1) {
            arr[fi] = `# ${name}`
        } else {
            arr.unshift(`# ${name}`)
        }
        const ntxt = arr.join('\n')
        fs.writeFileSync(rsrc, ntxt)
        reply(e, 'book_set_name', true)
    } catch (error) {
        reply(e, 'book_set_name', false)
    }
}
/** 设置封面
 * 现在只是简单的打开文件夹, 自己放文件
 */
function book_set_cover(e: Electron.IpcMainEvent, book_src: string) {
    try {
        const src = path.join(book_src, 'doc')
        if (!fs.existsSync(src)) {
            fs.mkdirSync(src)
        }
        const tsrc = path.join(src, '如何设置封面.txt')
        if (!fs.existsSync(tsrc)) {
            fs.writeFileSync(
                tsrc,
                '将封面图片(jpg/png)重命名为 preview.jpg/png 放到此文件夹内, 之后请alt/option + r重载程序',
            )
        }
        shell.showItemInFolder(tsrc)
        reply(e, 'book_set_cover', true)
    } catch (error) {
        reply(e, 'book_set_cover', false)
    }
}
