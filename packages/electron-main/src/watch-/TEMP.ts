import { ipcMain, shell, dialog, app } from 'electron'
import { reply } from 'util-/reply'

/**   */
export function _watch_TEMP() {
    const funcs: [string, any][] = [
        ['temp', temp],
        ['temp', temp],
        ['temp', temp],
        ['temp', temp],
    ]
    for (const fun of funcs) {
        ipcMain.on(fun[0], fun[1])
    }
}

function temp(e: Electron.IpcMainEvent) {
    reply(e, 'temp')
}
