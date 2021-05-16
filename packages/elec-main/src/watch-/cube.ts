import { ConstBookPath } from 'const-/book-path'
import { ipcMain, shell, dialog, app } from 'electron'
import { UtilFs } from 'util-/fs'
import { UtilReply } from 'util-/reply'
import { UtilSortName } from 'util-/sort-name'
import { WindowUtil } from 'window-'

class _c {
    watch() {
        ipcMain.on('cube_load', (e: Electron.IpcMainEvent, bookid: string) => {
            const msg = this.load(bookid)
            UtilReply.reply(e, 'cube_load', msg)
        })
        ipcMain.on('cube_save', (e: Electron.IpcMainEvent, bookid: string, cubes: cube_group_vo[]) => {
            const msg = this.save(bookid, cubes)
            UtilReply.reply(e, 'cube_save', msg)
        })
    }
    /** 读取 */
    load(bookid: string) {
        const book = WindowUtil.book_map.get(bookid)!
        const json_src = ConstBookPath.full_src(book.src, 'cube')
        const msg = UtilFs.read_json<cube_group_vo[]>(json_src)
        if (msg.b) {
            const li = msg.data || []
            li.forEach((group) => {
                UtilSortName.sort(group.children)
            })
            UtilSortName.sort(li)
        }
        return msg
    }
    /** 保存 */
    save(bookid: string, cubes: cube_group_vo[]) {
        const book = WindowUtil.book_map.get(bookid)!
        const msg = UtilReply.msg(null)
        try {
            const chasrc = ConstBookPath.full_src(book.src, 'cube')
            const t0 = JSON.stringify(cubes)
            UtilFs.write(chasrc, t0)
            msg.b = true
        } catch (error) {
            // 不会触发err
        }
        return msg
    }
}

export const WatchCube = new _c()
