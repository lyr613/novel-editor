import { ipcMain, shell, dialog, app } from 'electron'
import { reply, UtilReply } from 'util-/reply'
import fs from 'fs-extra'
import { effect_fs_read, effect_fs_read_json } from 'util-/fs'
import prettier from 'prettier'
import path from 'path'

/** 文件控制 */
export function _watch_fs() {
    ipcMain.on('fs_read', fs_read)
    ipcMain.on('fs_read_json', fs_read_json)
    ipcMain.on('fs_write', fs_write)
}

function fs_read(e: Electron.IpcMainEvent, src: string) {
    const re = effect_fs_read(src)
    reply(e, 'fs_read', re)
}

function fs_read_json(e: Electron.IpcMainEvent, src: string) {
    const re2 = effect_fs_read_json(src)
    reply(e, 'fs_read_json', re2)
}

function fs_write(e: Electron.IpcMainEvent, src: string, txt: string) {
    const re: fs_dto = {
        b: false,
        txt: '未知错误',
    }
    // 尝试对json格式化
    try {
        const extname = path.extname(src)
        if (extname === '.json') {
            txt = prettier.format(txt, {
                parser: 'json',
            })
        }
    } catch (error) {
        re.txt = 'json格式化错误'
        reply(e, 'fs_write', re)
        return
    }
    try {
        fs.writeFileSync(src, txt)
        re.b = true
        reply(e, 'fs_write', re)
    } catch (error) {
        reply(e, 'fs_write', re)
    }
}
