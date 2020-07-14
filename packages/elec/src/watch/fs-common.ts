import { ipcMain, shell, dialog, app } from 'electron'
import path from 'path'
import fs from 'fs'
import { reply } from './util'
import { ENV } from '@/const'

export function watch_fs_common() {
    // 读取文件内容
    ipcMain.on('fs_read', fs_read)
    /** 写入文件内容 */
    ipcMain.on('fs_write', fs_write)
    /** 创建文件夹 */
    ipcMain.on('mk_dir', mk_dir)
    /** 重命名 */
    ipcMain.on('fs_rename', fs_rename)
    /** 打开资源管理器(finder) */
    ipcMain.on('fs_show', fs_show)
    /** 选择文件夹 */
    ipcMain.on('fs_choose_dir', fs_choose_dir)
    /** 选择文件 */
    ipcMain.on('fs_choose_file', fs_choose_file)
    /** 安装路径 */
    ipcMain.on('app_set_src', app_set_src)
    /** 打开网址 */
    ipcMain.on('websrc', websrc)
}

/**
 * 读取文件内容
 * @param e
 * @param type
 * @param srcs
 * @returns 成功: 文本或obj, 失败: null
 */
function fs_read(e: Electron.IpcMainEvent, type: 'txt' | 'json', srcs: string[]) {
    try {
        _check_type(['txt', 'json'], type)
        const src = _compose_src(srcs, type)
        console.log('读取文件内容', src)

        const red = fs.readFileSync(src, 'utf-8')
        const re = type === 'json' ? JSON.parse(red) : red
        reply(e, 'fs_read', re)
    } catch (_) {
        reply(e, 'fs_read', null)
    }
}

/**
 * 写入文件内容
 * @param e
 * @param type 扩展名
 * @param srcs 路径数组
 * @param inset 写入内容
 * @returns 成功true, 失败false
 */
function fs_write(e: Electron.IpcMainEvent, type: 'txt' | 'json', srcs: string[], inset: string) {
    try {
        _check_type(['txt', 'json'], type)
        const src = _compose_src(srcs, type)
        fs.writeFileSync(src, inset)
        reply(e, 'fs_write', true)
    } catch (error) {
        reply(e, 'fs_write', false)
    }
}

/**
 * 新建文件夹
 * @param e
 * @param srcs
 */
function mk_dir(e: Electron.IpcMainEvent, srcs: string[]) {
    try {
        const src = path.join(...srcs)
        fs.mkdirSync(src)
        reply(e, 'mk_dir', true)
    } catch (error) {
        reply(e, 'mk_dir', false)
    }
}

/**
 * 重命名
 * @param e
 * @param oldsrcs
 * @param newsrcs
 */
function fs_rename(e: Electron.IpcMainEvent, oldsrcs: string[], newsrcs: string[]) {
    try {
        const od = path.join(...oldsrcs)
        const nw = path.join(...newsrcs)
        fs.renameSync(od, nw)
        reply(e, 'fs_rename', true)
    } catch (error) {
        reply(e, 'fs_rename', false)
    }
}

/** 从资源管理器中聚焦这个文件(夹) */
function fs_show(e: Electron.IpcMainEvent, srcs: string[]) {
    const src = path.join(...srcs)
    shell.showItemInFolder(src)
    reply(e, 'fs_show', true)
}

/** 选择文件夹
 * @returns src 选择的路径
 * @returns empty 是否是空的
 */
async function fs_choose_dir(e: Electron.IpcMainEvent) {
    try {
        const res = await dialog.showOpenDialog({
            properties: ['openDirectory'],
        })
        if (res.filePaths.length) {
            const src = res.filePaths[0]
            const cds = fs.readdirSync(src).filter((s) => !/^\./.test(s))
            const empty = !cds.length
            reply(e, 'fs_choose_dir', {
                src,
                empty,
            })
        } else {
            reply(e, 'fs_choose_dir', {
                src: '',
                empty: false,
            })
        }
    } catch (error) {
        reply(e, 'fs_choose_dir', {
            src: '',
            empty: false,
        })
    }
}
/** 选择文件 */
function fs_choose_file(e: Electron.IpcMainEvent) {
    dialog
        .showOpenDialog({
            properties: ['openFile'],
        })
        .then((res) => {
            if (res.filePaths.length) {
                reply(e, 'fs_choose_file', res.filePaths[0])
            } else {
                reply(e, 'fs_choose_file', '')
            }
        })
}

/** 获取保存设置路径 */
function app_set_src(e: Electron.IpcMainEvent) {
    // 修改时注意,页面初始需要这个路径, 可能造成无法加载页面
    let src = path.join(app.getPath('documents'), 'qv-writer')
    if (!fs.existsSync(src)) {
        fs.mkdirSync(src)
    }

    reply(e, 'app_set_src', src)
}

/**
 * 检查是否为允许类型
 * @param ts 允许类型
 * @param t 被检查
 */
function _check_type(ts: string[], t: string) {
    if (!ts.includes(t)) {
        throw ''
    }
}

/**
 * 组合路径
 * @param srcs 路径数组
 * @param type 扩展名
 */
function _compose_src(srcs: string[], type: string): string {
    if (srcs.find((v) => !v)) {
        throw '有空路径'
    }
    const la = srcs.length - 1
    const reg = new RegExp(`\\.${type}$`)
    if (!reg.test(srcs[la])) {
        srcs[la] += '.' + type
    }
    return path.join(...srcs)
}

/** 打开网址 */
function websrc(e: Electron.IpcMainEvent, src: string) {
    shell.openExternal(src)
}
