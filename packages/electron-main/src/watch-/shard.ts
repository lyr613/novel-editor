import { ipcMain, shell, dialog, app } from 'electron'
import { reply } from 'util-/reply'
import { get_main_window } from 'window-'
import path from 'path'
import { paths } from 'const-/path'
import fs from 'fs-extra'
import { effect_fs_read_json } from 'util-/fs'

/** 碎片, 不知道往哪放的 */
export function _watch_shard() {
    ipcMain.on('shard_load_editer_option', shard_load_editer_option)
}

/** 读取编辑器配置 */
function shard_load_editer_option(e: Electron.IpcMainEvent) {
    const opt_dir = path.join(paths().option, '..')
    if (!fs.existsSync(opt_dir)) {
        fs.mkdirSync(opt_dir)
    }
    const jn = effect_fs_read_json(paths().option)
    reply(e, 'shard_load_editer_option', jn)
}
