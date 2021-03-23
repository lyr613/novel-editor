import { ConstBookPath } from 'const-/book-path'
import { ipcMain, shell, dialog, app } from 'electron'
import { UtilFs } from 'util-/fs'
import { UtilReply } from 'util-/reply'
import { UtilSortName } from 'util-/sort-name'
import { WindowUtil } from 'window-'

class _o {
    watch() {
        ipcMain.on('book_option_load', (e, book_id) => {})
    }
    /** 读取 */
    load(bookid: string) {
        const book = WindowUtil.book_map.get(bookid)!
        const json_src = ConstBookPath.full_src(book.src, 'option')
        const msg = UtilFs.read_json<cube_group_vo[]>(json_src)
        return msg
    }
}

/** 每本书独立配置 */
export const WatchBookOption = new _o()
