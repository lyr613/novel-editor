import { v4 as uuid } from 'uuid'
import cp from 'child_process'

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

/** 检查是否有git */
export function check_did_install_git() {
    try {
        const git_re = cp.execSync('git --version').toString()
        return /git version/.test(git_re)
    } catch (error) {
        return false
    }
}
