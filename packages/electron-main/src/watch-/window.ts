import { ipcMain, shell, dialog } from 'electron'

export function _watch_window() {
    ipcMain.on('window_min', window_min)
}

function window_min(e: Electron.IpcMainEvent) {
    console.log(23333)
    e.returnValue = undefined
}
