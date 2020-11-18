import { ipcMain, shell, dialog } from 'electron'
import { reply } from 'util-/reply'

/** 窗口控制 */
export function _watch_window() {
    ipcMain.on('window_min', window_min)
}

function window_min(e: Electron.IpcMainEvent) {
    console.log(23333)
    e.returnValue = undefined
    reply(e, 'window_min', 1, 2, 3)
}
