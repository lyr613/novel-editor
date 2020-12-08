import { paths } from 'const-/path'
import { ipcMain, shell, dialog, app } from 'electron'
import { reply } from 'util-/reply'

/** 获取一些路径 */
export function _watch_path() {
    ipcMain.on('path', path)
    ipcMain.on('path_pick', path_pick)
}

function path(e: Electron.IpcMainEvent, path_code: path_dto) {
    reply(e, 'path', _get_path(path_code))
}

function _get_path(path_code: path_dto) {
    switch (path_code) {
        case 'option':
            return paths().option

        default:
            break
    }
    return ''
}

function path_pick(e: Electron.IpcMainEvent) {
    dialog
        .showOpenDialog({
            properties: ['openDirectory'],
        })
        .then((res) => {
            if (!res.filePaths.length) {
                reply(e, 'path_pick', '')
                return ''
            }
            const src = res.filePaths[0]
            reply(e, 'path_pick', src)
        })
}
