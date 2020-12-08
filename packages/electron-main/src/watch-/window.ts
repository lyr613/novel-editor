import { ipcMain, shell, dialog, app } from 'electron'
import { reply } from 'util-/reply'
import { get_main_window } from 'window-'

/** 窗口控制 */
export function _watch_window() {
    ipcMain.on('window_min', window_min)
    ipcMain.on('window_max', window_max)
    ipcMain.on('window_close', window_close)
}

function window_min(e: Electron.IpcMainEvent) {
    console.log('最小化')
    const mw = get_main_window()
    mw.minimize()
    reply(e, 'window_min')
}
function window_max(e: Electron.IpcMainEvent) {
    console.log('最大化')
    const mw = get_main_window()
    if (mw.isMaximized()) {
        mw.unmaximize()
    } else {
        mw.maximize()
    }
    reply(e, 'window_max')
}
function window_close(e: Electron.IpcMainEvent) {
    console.log('关闭')
    const mw = get_main_window()
    mw.close()
    // reply(e, 'window_close')
}
