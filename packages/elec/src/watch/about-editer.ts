import { ipcMain, dialog, app } from 'electron'
import path from 'path'
import fs from 'fs'
import { reply, id32, check_did_install_git } from './util'
import cp from 'child_process'

export function watch_editer() {
    /** 获取编辑器设置 */
    ipcMain.on('editer_load_setting', editer_load_setting)
}

function editer_load_setting(e: Electron.IpcMainEvent) {
    try {
        const dir_src = path.join(app.getPath('documents'), 'qv-writer')
        const file_src = path.join(dir_src, 'settings.json')

        if (!fs.existsSync(dir_src)) {
            fs.mkdirSync(dir_src)
            reply(e, 'editer_setting', null)
            return
        }
        if (!fs.existsSync(file_src)) {
            reply(e, 'editer_setting', null)
            return
        }

        const txt = fs.readFileSync(file_src, 'utf-8')
        const jsn: setting = JSON.parse(txt)

        jsn.git = check_did_install_git()

        reply(e, 'editer_setting', jsn)
    } catch (error) {
        reply(e, 'editer_setting', null)
    }
}
