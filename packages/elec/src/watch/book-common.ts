import { ipcMain, shell, dialog } from 'electron'
import path from 'path'
import fs from 'fs'
import { reply } from './util'
import { count_cn_word } from '@/func/count-word'

export function watch_book_common() {
    // 每节的字数
    ipcMain.on('bookc_node_words', bookc_node_words)
}

/**
 * 读取文件内容
 * @param e
 * @param type
 * @param srcs
 * @returns 成功: 文本或obj, 失败: null
 */
function bookc_node_words(e: Electron.IpcMainEvent, book_src: string, node_list: any[]) {
    if (!book_src) {
        reply(e, 'bookc_node_words', {})
        return
    }
    try {
        const csrc = path.join(book_src, 'chapters')
        const nodes = node_list.map((v) => v.id)
        const re: { [k: string]: [number, number] } = {}
        let scan = 0
        nodes.forEach((nid) => {
            try {
                const nsrc = path.join(csrc, nid + '.txt')
                const txt = fs.readFileSync(nsrc, 'utf-8')
                const n = count_cn_word(txt)
                re[nid] = [n, scan]
                scan += n
            } catch (error) {}
        })
        re.all = [scan, scan]
        reply(e, 'bookc_node_words', re)
    } catch (_) {
        reply(e, 'bookc_node_words', {})
    }
}
