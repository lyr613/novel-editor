// 归档
import { ipcMain, shell, dialog } from 'electron'
import path from 'path'
import fs from 'fs'
import { reply, id32 } from './util'
import cp from 'child_process'
import { check_exist_path } from '@/util/path'

export function watch_git() {
    // 检查是否为仓库
    ipcMain.on('git_check', git_check)
    // 创建仓库
    ipcMain.on('git_init', git_init)
    // 检查是否有远程仓库
    ipcMain.on('git_check_has_remote', git_check_has_remote)
    // 检查可以本地储存
    ipcMain.on('git_check_can_save', git_check_can_save)
    // 本地储存
    ipcMain.on('git_local_save', git_local_save)
    // 添加远程仓库
    ipcMain.on('git_set_remote', git_set_remote)
    // 推送
    ipcMain.on('git_push', git_push)
    // 拉取
    ipcMain.on('git_pull', git_pull)
}

/**
 * 检查是否为git仓库
 * @param e
 * @param book_src 书路径
 * @returns 有: 2, 无: 1, 失败: -1,
 */
function git_check(e: Electron.IpcMainEvent, book_src: string) {
    try {
        check_exist_path(book_src)
        const src = path.join(book_src, '.git')
        const b = fs.existsSync(src)
        reply(e, 'git_check', b ? 2 : 1)
    } catch (str) {
        reply(e, 'git_check', -1)
    }
}

/** 初始化git仓库 */
function git_init(e: Electron.IpcMainEvent, book_src: string) {
    try {
        check_exist_path(book_src)
        console.log('从', book_src, '创建git仓库')

        const re = cp
            .execSync('git init', {
                cwd: book_src,
            })
            .toString()
        console.log(re)
        const suc = /Initialized empty Git repository/.test(re)

        reply(e, 'git_init', suc)
    } catch (error) {
        reply(e, 'git_init', false)
    }
}

/**
 * 检查是否有远程仓库
 * @param e
 * @param book_src 书路径
 * @returns 有: 2, 无: 1, 失败: -1,
 */
function git_check_has_remote(e: Electron.IpcMainEvent, book_src: string) {
    try {
        check_exist_path(book_src)
        const src = path.join(book_src, '.git', 'config')
        const txt = fs.readFileSync(src, 'utf-8')
        const has = /\[remote "origin"\]/.test(txt)
        reply(e, 'git_check', has ? 2 : 1)
    } catch (str) {
        reply(e, 'git_check', -1)
    }
}
/**
 * 在本地储存
 * @param e
 * @param book_src 书路径
 * @param msg 提交消息
 * @returns boolean,
 */
function git_local_save(e: Electron.IpcMainEvent, book_src: string, msg: string) {
    try {
        check_exist_path(book_src)
        const opt = {
            cwd: book_src,
        }
        cp.execSync('git add -A -- .', opt).toString()

        const re2 = cp.execSync(`git commit -m "${msg}"  --allow-empty-message `, opt).toString()
        console.log(re2)

        reply(e, 'git_local_save', true)
    } catch (str) {
        console.log('提交失败了')
        reply(e, 'git_local_save', false)
    }
}
/**
 * 检查可以在本地储存
 * @param e
 * @param book_src 书路径
 */
function git_check_can_save(e: Electron.IpcMainEvent, book_src: string) {
    try {
        check_exist_path(book_src)
        const opt = {
            cwd: book_src,
        }
        const re = cp
            .execSync('git status -z -u', opt)
            .toString()
            .trim()
        console.log(re)

        reply(e, 'git_check_can_save', re.length > 0)
    } catch (str) {
        reply(e, 'git_check_can_save', false)
    }
}
/**
 * 添加远程仓库
 * @param e
 * @param book_src 书路径
 */
function git_set_remote(e: Electron.IpcMainEvent, book_src: string, remote: string, action: 'add' | 'update') {
    try {
        check_exist_path(book_src)
        const opt = {
            cwd: book_src,
        }
        const shell = action === 'add' ? `git remote add origin ${remote}` : `git remote set-url origin ${remote}`
        const re = cp
            .execSync(shell, opt)
            .toString()
            .trim()
        console.log(re)

        reply(e, 'git_set_remote', true)
    } catch (str) {
        reply(e, 'git_set_remote', false)
    }
}
/**
 * 同步仓库 ,  推送
 * @param e
 * @param book_src 书路径
 */
function git_push(e: Electron.IpcMainEvent, book_src: string) {
    try {
        check_exist_path(book_src)
        const opt = {
            cwd: book_src,
        }
        cp.exec(`git push -u origin master`, opt, (err, out) => {
            console.log('err', err)
            console.log('out', out)
            const suc = !err
            reply(e, 'git_push', suc)
        })
    } catch (str) {
        reply(e, 'git_push', false)
    }
}
/**
 * 同步仓库 ,  拉取
 * @param e
 * @param book_src 书路径
 */
function git_pull(e: Electron.IpcMainEvent, book_src: string) {
    try {
        check_exist_path(book_src)
        const opt = {
            cwd: book_src,
        }
        cp.exec(`git pull --tags origin master`, opt, (err, out) => {
            console.log('err', err)
            console.log('out', out)
            const suc = !err
            const re = {
                be_suc: suc,
                src: book_src,
            }
            reply(e, 'git_pull', re)
        })
    } catch (str) {
        reply(e, 'git_pull', {
            be_suc: false,
            src: book_src,
        })
    }
}
