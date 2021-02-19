import { ipcMain, shell, dialog, app } from 'electron'
import { reply } from 'util-/reply'

/**   */
export function _watch_TEMP() {
    const funcs = [temp]
    for (const fun of funcs) {
        ipcMain.on(fun.name, fun)
    }
}

function temp(e: Electron.IpcMainEvent) {
    reply(e, 'temp')
}
