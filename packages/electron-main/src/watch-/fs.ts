import { ipcMain, shell, dialog, app } from 'electron'
import { UtilReply } from 'util-/reply'
import fs from 'fs-extra'
import { effect_fs_read, effect_fs_read_json, UtilFs } from 'util-/fs'
import prettier from 'prettier'
import path from 'path'

/** 文件控制 */
export function _watch_fs() {
    ipcMain.on('fs_read', fs_read)
    ipcMain.on('fs_read_json', fs_read_json)
    ipcMain.on('fs_write', fs_write)
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
