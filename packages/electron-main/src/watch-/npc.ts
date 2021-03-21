import { ConstBookPath } from 'const-/book-path'
import { ipcMain, shell, dialog, app } from 'electron'
import { UtilFs } from 'util-/fs'
import { UtilReply } from 'util-/reply'
import { UtilSortName } from 'util-/sort-name'
import { WindowUtil } from 'window-'
import { WatchCube } from './cube'

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
        // console.log('---')
        // console.log(msg.data)

        if (msg.b) {
            const group_li = WatchCube.load(bookid).data || []
            const group_map = new Map<string, cube_group_vo>()
            const item_map = new Map<string, cube_item_vo>()
            group_li.forEach((gp) => {
                group_map.set(gp.id, gp)
                gp.children.forEach((it) => {
                    item_map.set(it.id, it)
                })
            })

            const npc_li = msg.data || []

            // 恢复立方体文字
            npc_li.forEach((npc) => {
                npc.slices.forEach((sli) => {
                    sli.cube.forEach((gp) => {
                        gp.name_show = group_map.get(gp.id)?.name_show || ''
                        gp.children.forEach((it) => {
                            it.name_show = item_map.get(it.id)?.name_show || ''
                        })
                    })
                })
            })
            UtilSortName.sort(npc_li)
        }
        UtilReply.reply(e, 'npc_load', msg)
    } catch (error) {
        // 不会触发err
    }
}

function npc_save(e: Electron.IpcMainEvent, bookid: string, npcs: npc_vo[]) {
    const book = WindowUtil.book_map.get(bookid)!
    const msg = UtilReply.msg(null)
    // 删掉多余文字
    npcs.forEach((npc) => {
        npc.slices.forEach((sli) => {
            sli.cube.forEach((group) => {
                group.name = ''
                group.name_show = ''
                group.sort = 0
                group.children.forEach((item) => {
                    item.name = ''
                    item.name_show = ''
                    item.remark = ''
                    item.sort = 0
                })
            })
        })
    })
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
