import { ipcMain, shell, dialog, app } from 'electron'
import { reply } from 'util-/reply'
import { get_main_window } from 'window-'

/** 书目 */
export function _watch_book() {
    ipcMain.on('temp', temp)
}

function temp(e: Electron.IpcMainEvent) {
    reply(e, 'temp')
}
