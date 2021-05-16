import { ConstAppPath } from 'const-/app-path'
import { ipcMain, shell, dialog, app } from 'electron'
import { UtilReply } from 'util-/reply'

/** 获取一些路径 */
export function _watch_path() {
    ipcMain.on('path_get', path_get)
    ipcMain.on('path_pick', path_pick)
}

function path_get(e: Electron.IpcMainEvent, path_code: path_dto) {
    const msg = UtilReply.msg(_get_path(path_code))
    UtilReply.reply(e, 'path_get', msg)
}

function _get_path(path_code: path_dto) {
    switch (path_code) {
        case 'option':
            return ConstAppPath.option

        default:
            break
    }
    return ''
}

/** 通过选择获取目录 */
function path_pick(e: Electron.IpcMainEvent) {
    dialog
        .showOpenDialog({
            properties: ['openDirectory'],
        })
        .then((res) => {
            const msg = UtilReply.msg('')
            if (!res.filePaths.length) {
                UtilReply.reply(e, 'path_pick', msg)
                return ''
            }
            const src = res.filePaths[0]
            msg.b = true
            msg.data = src
            UtilReply.reply(e, 'path_pick', msg)
        })
}
