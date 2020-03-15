// 归档
import { ipcMain, shell, dialog } from 'electron'
import path from 'path'
import fs from 'fs'
import { reply, id32 } from './util'
import cp from 'child_process'
import { ENV } from '@/const'

export function watch_git() {
    // 检查是否为仓库
    ipcMain.on('git_check', git_check)
    // 创建仓库
    ipcMain.on('git_init', git_init)
}

/**
 * 检查是否为git仓库
 * @param e
 * @param book_src 书路径
 * @returns 成功: true, 失败: false, 其他: string
 */
function git_check(e: Electron.IpcMainEvent, book_src: string) {
    try {
        if (!book_src) {
            throw '没有书本路径'
        }
        const src = path.join(book_src, '.git')
        const b = fs.existsSync(src)
        reply(e, 'git_check', b)
    } catch (str) {
        reply(e, 'git_check', str)
    }
}

function git_init(e: Electron.IpcMainEvent, book_src: string) {
    try {
        if (!book_src) {
            throw '没有书本路径'
        }
        cp.execSync(` cd ${book_src} && git init `)
        reply(e, 'git_init', true)
    } catch (error) {
        reply(e, 'git_init', false)
    }
}
