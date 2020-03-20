import { ipcMain, dialog } from 'electron'
import path from 'path'
import fs from 'fs'
import { reply, id32 } from './util'
import { get_chapters } from '@/func/fs'

export function watch_book() {
    /** 根据路径列表读取书的信息 */
    ipcMain.on('load_books', load_books)
    /** 选择书的路径 */
    ipcMain.on('select_src', select_src)
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
        const re: book[] = srcs.map((src) => {
            try {
                return {
                    id: id32(),
                    name: path.basename(src),
                    src,
                    cover: find_cover(src),
                }
            } catch (error) {
                return {
                    id: id32(),
                    name: '读取失败',
                    src,
                    cover: '',
                }
            }
        })
        reply(e, 'load_books', re)
    } catch (error) {
        reply(e, 'load_books', [])
    }
    function find_cover(src: string) {
        const files = fs.readdirSync(src)
        const fi = files.find((str) => /^封面\.(png|jpg|gif)/.test(str))
        return fi ? path.resolve(src, fi) : ''
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
            re.push({
                chapter: cp,
                matchs: matchs,
            })
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
    } catch (error) {}
}
