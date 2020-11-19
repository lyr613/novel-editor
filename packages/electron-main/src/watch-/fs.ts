import { ipcMain, shell, dialog, app } from 'electron'
import { reply } from 'util-/reply'
import { get_main_window } from 'window-'
import fs from 'fs-extra'

/** 窗口控制 */
export function _watch_fs() {
    ipcMain.on('fs_read', fs_read)
    ipcMain.on('fs_read_json', fs_read_json)
}

function effect_read(src: string) {
    try {
        const re: fs_dto = {
            b: false,
            txt: '',
        }
        if (!fs.existsSync(src)) {
            re.txt = '文件不存在'
            return re
        }
        const stat = fs.statSync(src)
        if (!stat.isFile()) {
            re.txt = '不是可读文件'
            return re
        }
        re.b = true
        re.txt = fs.readFileSync(src, 'utf-8')
        return re
    } catch (error) {
        const o: fs_dto = {
            b: false,
            txt: '未知错误',
        }
        return o
    }
}
function fs_read(e: Electron.IpcMainEvent, src: string) {
    const re = effect_read(src)
    reply(e, 'fs_read', re)
}
function fs_read_json(e: Electron.IpcMainEvent, src: string) {
    const re = effect_read(src)
    if (!re.b) {
        // 这里错误了可以直接返回, 因为错误了不会去用data
        reply(e, 'fs_read', re)
        return
    }
    try {
        const re2 = { ...re, data: JSON.parse(re.txt) }
        reply(e, 'fs_read_json', re2)
    } catch (error) {
        const re3: fs_json_dto = {
            b: false,
            txt: 'json解析错误',
            data: {},
        }
        reply(e, 'fs_read_json', re3)
    }
    return
}
