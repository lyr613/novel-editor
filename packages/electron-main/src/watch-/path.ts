import { paths } from 'const-/path'
import { ipcMain, shell, dialog, app } from 'electron'
import { reply } from 'util-/reply'

/** 获取一些路径 */
export function _watch_path() {
    ipcMain.on('path', path)
}

function path(e: Electron.IpcMainEvent, path_code: path_dto) {
    reply(e, 'path', get_path(path_code))
}

function get_path(path_code: path_dto) {
    switch (path_code) {
        case 'option':
            return paths().option

        default:
            break
    }
    return ''
}
