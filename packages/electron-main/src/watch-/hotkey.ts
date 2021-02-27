import { ipcMain, shell, dialog, app } from 'electron'
import { UtilReply } from 'util-/reply'
import { WindowUtil } from 'window-'

/**   */
export function _watch_hotkey() {
    ipcMain.on('hotkey_devtool', hotkey_devtool)
}

function hotkey_devtool(e: Electron.IpcMainEvent, bid: string) {
    let win = WindowUtil.child_map.get(bid)
    if (!bid) {
        win = WindowUtil.main_window
    }
    if (!win) {
        return
    }
    const con = win.webContents
    console.log('con', win, con)

    con?.toggleDevTools()
    // UtilReply. reply(e, 'temp')
}
