import { ConstAppPath } from 'const-/app-path'
import { ipcMain, shell, dialog, app } from 'electron'
import { UtilReply } from 'util-/reply'
import { WindowUtil } from 'window-'
import path from 'path'
import fs from 'fs-extra'

/** 获取一些路径 */
export function _watch_path() {
    ipcMain.on('path_get', path_get)
    ipcMain.on('path_pick', path_pick)
    ipcMain.on('path_img_will_save', (e, opt) => {
        const re = path_img_will_save(opt)
        const reg = UtilReply.msg(re)
        UtilReply.reply(e, 'path_img_will_save', reg)
    })
}

function path_get(e: Electron.IpcMainEvent, path_code: path_dto) {
    const msg = UtilReply.msg(_get_path(path_code))
    UtilReply.reply(e, 'path_get', msg)
}

function _get_path(path_code: path_dto) {
    switch (path_code) {
        case 'option':
            return ConstAppPath.option

        default:
            break
    }
    return ''
}

/** 通过选择获取目录 */
function path_pick(e: Electron.IpcMainEvent, properties: string[] = ['openDirectory']) {
    dialog
        .showOpenDialog({
            properties: properties as any,
        })
        .then((res) => {
            const msg = UtilReply.msg('')
            if (!res.filePaths.length) {
                UtilReply.reply(e, 'path_pick', msg)
                return ''
            }
            const src = res.filePaths[0]
            msg.b = true
            msg.data = src
            UtilReply.reply(e, 'path_pick', msg)
        })
}

interface path_img_will_save_npc {
    type: 'npc'
    book_id: string
    npc_id: string
    be_head: boolean
}
function path_img_will_save(opt: path_img_will_save_npc) {
    const src_book = WindowUtil.book_map.get(opt.book_id)!.src
    const src_dir = path.join(src_book, 'img')
    if (!fs.existsSync(src_dir)) {
        fs.mkdirSync(src_dir)
    }
    const imgs = fs.readdirSync(src_dir)
    const re = {
        full: '',
        base: '',
    }
    if (opt.type === 'npc') {
        let basename = opt.be_head ? `${opt.npc_id}-head` : `${opt.npc_id}-`
        if (!opt.be_head) {
            const reg = new RegExp('^' + opt.npc_id + '-' + '\\d+$')

            const lihuis = imgs
                .filter((v) => reg.test(v))
                .map((v) => v.replace(/^\w+-/, ''))
                .map((s) => Number(s))

            if (lihuis.length) {
                const max = Math.max(...lihuis) + 10
                basename += max
            } else {
                basename += 10
            }
        }
        re.full = path.join(src_dir, basename)
        re.base = basename
        return re
    }
    return re
}
