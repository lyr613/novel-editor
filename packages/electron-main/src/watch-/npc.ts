import { ConstBookPath } from 'const-/book-path'
import { ipcMain, shell, dialog, app } from 'electron'
import { UtilFs } from 'util-/fs'
import { UtilReply } from 'util-/reply'
import { UtilSortName } from 'util-/sort-name'
import { WindowUtil } from 'window-'

/**   */
export function _watch_npc() {
    ipcMain.on('npc_load', npc_load)
    ipcMain.on('npc_save', npc_save)
}

function npc_load(e: Electron.IpcMainEvent, bookid: string) {
    // UtilReply. reply(e, 'temp')
    const book = WindowUtil.book_map.get(bookid)!
    try {
        const chasrc = ConstBookPath.full_src(book.src, 'npc')
        const msg = UtilFs.read_json<npc_vo[]>(chasrc)
        console.log('---')
        console.log(msg.data)

        if (msg.b) {
            const li = msg.data || []
            UtilSortName.sort(li)
        }
        UtilReply.reply(e, 'npc_load', msg)
    } catch (error) {
        // 不会触发err
    }
}

function npc_save(e: Electron.IpcMainEvent, bookid: string, npcs: npc_vo[]) {
    const book = WindowUtil.book_map.get(bookid)!
    const msg = UtilReply.msg(null)
    try {
        const chasrc = ConstBookPath.full_src(book.src, 'npc')
        const t0 = JSON.stringify(npcs)
        UtilFs.write(chasrc, t0)
        msg.b = true
        UtilReply.reply(e, 'npc_save', msg)
    } catch (error) {
        // 不会触发err
        UtilReply.reply(e, 'npc_save', msg)
    }
}
