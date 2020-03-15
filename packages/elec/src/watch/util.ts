import { ipcMain } from 'electron'
import { v4 as uuid } from 'uuid'

/**
 * 回复消息
 * @param re 载体
 */
export function reply(e: Electron.IpcMainEvent, flag: string, re: any) {
    e.returnValue = re
    e.reply(flag, re)
}

/**
 * 生成32位uuid, 无横杠
 */
export function id32() {
    return uuid().replace(/-/g, '')
}
