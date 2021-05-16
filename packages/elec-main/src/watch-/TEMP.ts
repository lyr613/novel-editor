import { ipcMain, shell, dialog, app } from 'electron'
import { UtilReply } from 'util-/reply'

/**   */
export function _watch_TEMP() {
    ipcMain.on('qqqq', temp)
}

function temp(e: Electron.IpcMainEvent) {
    // UtilReply. reply(e, 'temp')
}
