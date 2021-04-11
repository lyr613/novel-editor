import { ConstBookPath } from 'const-/book-path'
import { ipcMain } from 'electron'
import { WindowUtil } from 'window-'
import fs from 'fs'
import cp from 'child_process'
import { UtilFs } from 'util-/fs'
import { UtilReply } from 'util-/reply'

class _t {
    watch() {
        ipcMain.on('threads_vscode', (e, book_id) => {
            this.threads_vscode(book_id)
        })
        ipcMain.on('threads_save', (e: any, book_id: string, obj: threads_vo) => {
            this.threads_save(e, book_id, obj)
        })
        ipcMain.on('threads_load', (e, book_id) => {
            const msg = this.load(book_id)
            UtilReply.reply(e, 'threads_load', msg)
        })
    }
    /**
     * @deprecated
     * @param book_id
     */
    threads_vscode(book_id: string) {
        const book = WindowUtil.book_map.get(book_id)!
        const drawio_src = ConstBookPath.full_src(book.src, 'threads')
        if (!fs.existsSync(drawio_src)) {
            fs.writeFileSync(drawio_src, '')
        }
        cp.execSync(`code ${book.src}`)
        setTimeout(() => {
            cp.execSync(`code ${drawio_src}`)
        }, 1500)
    }
    threads_save(e: any, book_id: string, obj: threads_vo) {
        const book = WindowUtil.book_map.get(book_id)!
        const json_src = ConstBookPath.full_src(book.src, 'threads')
        UtilFs.write(json_src, JSON.stringify(obj))
        const msg = UtilReply.msg(null)
        UtilReply.reply(e, 'threads_save', msg)
    }
    load(book_id: string) {
        const book = WindowUtil.book_map.get(book_id)!
        const json_src = ConstBookPath.full_src(book.src, 'threads')
        const msg: msg_dto<threads_vo | null> = UtilFs.read_json(json_src)
        return msg
    }
}

export const WatchThreads = new _t()
