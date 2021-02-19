import { ipcMain, shell, dialog, app } from 'electron'
import { reply } from 'util-/reply'
import { WindowUtil } from 'window-'
import path from 'path'
import fs from 'fs-extra'
import { FileAndDir } from 'const-/file-and-dir'
import { effect_fs_read_json } from 'util-/fs'

/**   */
export function _watch_chapter() {
    const funcs: [string, any][] = [
        ['chapter_load', chapter_load],
        //
    ]
    for (const fun of funcs) {
        ipcMain.on(fun[0], fun[1])
    }
}

/** 读取书的章节 */
function chapter_load(e: Electron.IpcMainEvent, bookid: string) {
    const book = WindowUtil.book_map.get(bookid)!
    try {
        const chasrc = path.join(book.src, FileAndDir.option)
        const jn = effect_fs_read_json<volume_vo[]>(chasrc)

        reply(e, 'chapter_load', jn)
    } catch (error) {
        // 不会触发err
        reply(e, 'chapter_load', false)
    }
}
