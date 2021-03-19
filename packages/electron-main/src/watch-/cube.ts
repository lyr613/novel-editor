import { ConstBookPath } from 'const-/book-path'
import { ipcMain, shell, dialog, app } from 'electron'
import { UtilFs } from 'util-/fs'
import { UtilReply } from 'util-/reply'
import { WindowUtil } from 'window-'

/**   */
export function _watch_cube() {
    ipcMain.on('cube_load', cube_load)
    ipcMain.on('cube_save', cube_save)
}

function cube_load(e: Electron.IpcMainEvent, bookid: string) {
    // UtilReply. reply(e, 'temp')
    const book = WindowUtil.book_map.get(bookid)!
    try {
        const chasrc = ConstBookPath.full_src(book.src, 'cube')
        const msg = UtilFs.read_json<volume_vo[]>(chasrc)
        UtilReply.reply(e, 'chapter_load', msg)
    } catch (error) {
        // 不会触发err
    }
}

function cube_save(e: Electron.IpcMainEvent, bookid: string, cubes: volume_vo[]) {
    const book = WindowUtil.book_map.get(bookid)!
    const msg = UtilReply.msg(null)
    try {
        const chasrc = ConstBookPath.full_src(book.src, 'cube')
        const t0 = JSON.stringify(cubes)
        UtilFs.write(chasrc, t0)
        msg.b = true
        UtilReply.reply(e, 'chapter_save', msg)
    } catch (error) {
        // 不会触发err
        UtilReply.reply(e, 'chapter_save', msg)
    }
}
