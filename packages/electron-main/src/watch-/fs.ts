import { ipcMain, shell, dialog, app } from 'electron'
import { reply } from 'util-/reply'
import { get_main_window } from 'window-'
import fs from 'fs-extra'
import { effect_fs_read, effect_fs_read_json } from 'util-/fs'

/** 窗口控制 */
export function _watch_fs() {
    ipcMain.on('fs_read', fs_read)
    ipcMain.on('fs_read_json', fs_read_json)
}

function fs_read(e: Electron.IpcMainEvent, src: string) {
    const re = effect_fs_read(src)
    reply(e, 'fs_read', re)
}

function fs_read_json(e: Electron.IpcMainEvent, src: string) {
    const re2 = effect_fs_read_json(src)
    reply(e, 'fs_read_json', re2)
}
