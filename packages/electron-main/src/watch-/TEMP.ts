import { ipcMain, shell, dialog, app } from 'electron'
import { reply } from 'util-/reply'
import { get_main_window } from 'window-'

/** 窗口控制 */
export function _watch_TEMP() {
    ipcMain.on('temp', temp)
}

function temp(e: Electron.IpcMainEvent) {
    reply(e, 'temp')
}
