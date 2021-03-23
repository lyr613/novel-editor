import { ConstBookPath } from 'const-/book-path'
import { ipcMain, shell, dialog, app } from 'electron'
import { UtilFs } from 'util-/fs'
import { UtilReply } from 'util-/reply'
import { UtilSortName } from 'util-/sort-name'
import { WindowUtil } from 'window-'

class _o {
    watch() {
        ipcMain.on('book_option_load', (e, book_id) => {
            const msg = this.load(book_id)
            UtilReply.reply(e, 'book_option_load', msg)
        })
        ipcMain.on('book_option_save', (e, book_id, opt) => {
            const msg = this.save(book_id, opt)
            UtilReply.reply(e, 'book_option_save', msg)
        })
    }
    /** 读取 */
    load(bookid: string) {
        const book = WindowUtil.book_map.get(bookid)!
        const json_src = ConstBookPath.full_src(book.src, 'option')
        const msg = UtilFs.read_json<any>(json_src)
        return msg
    }
    /** 保存 */
    save(bookid: string, opt: any) {
        const book = WindowUtil.book_map.get(bookid)!
        const msg = UtilReply.msg(null)
        try {
            const chasrc = ConstBookPath.full_src(book.src, 'option')
            const t0 = JSON.stringify(opt)
            UtilFs.write(chasrc, t0)
            msg.b = true
        } catch (error) {
            // 不会触发err
        }
        return msg
    }
}

/** 每本书独立配置 */
export const WatchBookOption = new _o()
