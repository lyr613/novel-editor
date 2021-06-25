import { ipcMain, shell, dialog, app } from 'electron'
import { UtilReply } from 'util-/reply'
import fs from 'fs-extra'
import { UtilFs } from 'util-/fs'
import prettier from 'prettier'
import path from 'path'
import { WindowUtil } from 'window-'

/** 文件控制 */
export function _watch_fs() {
    ipcMain.on('fs_read', fs_read)
    ipcMain.on('fs_read_json', fs_read_json)
    ipcMain.on('fs_write', fs_write)
    ipcMain.on('fs_show_in_folder', fs_show_in_folder)
    ipcMain.on('fs_vscode', fs_vscode)
    ipcMain.on('fs_read_img', fs_read_img)
}

function fs_read_img(e: Electron.IpcMainEvent, src: string, book?: book_option_vo) {
    // if (book_id) {
    const src_base = book?.src
    // }
    if (src_base) {
        src = path.join(src_base, 'img', src)
    }
    console.log('读取图片', src)

    //
    const re = UtilReply.msg(null as null | Buffer)
    const bn = path.basename(src)
    if (!/(png|jpg)$/.test(bn)) {
        UtilReply.reply(e, 'fs_read_img', re)
        return
    }
    if (!fs.existsSync(src)) {
        UtilReply.reply(e, 'fs_read_img', re)
        return
    }
    const buf = fs.readFileSync(src)
    re.data = buf
    re.b = true
    UtilReply.reply(e, 'fs_read_img', re)
}
function fs_read(e: Electron.IpcMainEvent, src: string) {
    const re = UtilFs.read(src)
    UtilReply.reply(e, 'fs_read', re)
}

function fs_read_json(e: Electron.IpcMainEvent, src: string) {
    const re2 = UtilFs.read_json(src)
    UtilReply.reply(e, 'fs_read_json', re2)
}

function fs_write(e: Electron.IpcMainEvent, src: string, txt: string) {
    const re = UtilFs.write(src, txt)
    UtilReply.reply(e, 'fs_write', re)
}

function fs_show_in_folder(e: Electron.IpcMainEvent, src: string) {
    const re = UtilFs.show_in_folder(src)
    UtilReply.reply(e, 'fs_show_in_folder', re)
}
function fs_vscode(e: Electron.IpcMainEvent, src: string) {
    const re = UtilFs.vscode(src)
    UtilReply.reply(e, 'fs_vscode', re)
}
