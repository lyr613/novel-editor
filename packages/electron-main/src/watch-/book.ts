import { ipcMain, shell, dialog, app, BrowserWindow } from 'electron'
import { UtilReply } from 'util-/reply'
import path from 'path'
import fs from 'fs-extra'
import { mk_uuid } from 'util-/uuid'
import { OptionLoad } from './option'
import { paths } from 'const-/path'
import { WindowUtil } from 'window-'
import { FileAndDir } from 'const-/file-and-dir'
import { UtilFs } from 'util-/fs'

/** 书目 */
export function _watch_book() {
    ipcMain.on('book_load_li', book_load_li)
    ipcMain.on('book_get_cache', book_get_cache)
    ipcMain.on('book_add', book_add)
    ipcMain.on('book_unlink', book_unlink)
    ipcMain.on('book_open_child_window', book_open_child_window)
}

/** 加载书目列表 */
function book_load_li(e: Electron.IpcMainEvent, srcs: string[]) {
    const re: book_vo[] = srcs.map(_load_book)
    const msg = UtilReply.msg(re)
    msg.b = true
    UtilReply.reply(e, 'book_load_li', msg)
}

/** 加载一本书 */
function book_get_cache(e: Electron.IpcMainEvent, bid: string) {
    const bk = WindowUtil.book_map.get(bid)
    const msg = UtilReply.msg(bk)
    if (bk) {
        msg.b = true
    }
    UtilReply.reply(e, 'book_get_cache', msg)
}

function _load_book(src: string): book_vo {
    const opt_src = path.join(src, FileAndDir.option)
    const re = {
        id: mk_uuid(),
        name: '查找失败',
        src: src,
        cover: '',
        git: false,
    }
    if (!fs.existsSync(src)) {
        re.name = '!不存在此路径!'
        return re
    }
    if (!fs.existsSync(opt_src)) {
        re.name = '!不存在配置文件!'
        return re
    }

    try {
        const opt_txt = fs.readFileSync(opt_src, 'utf-8')
        const opt = JSON.parse(opt_txt)
        Object.assign(re, opt)
        return re
    } catch (error) {
        return re
    }
}

/** 添加一本书
 *  编辑也走这
 */
function book_add(e: Electron.IpcMainEvent, book: book_vo) {
    const msg = UtilReply.msg(null)
    //
    try {
        const app_opt = OptionLoad.effect_load()
        if (!app_opt.shelf.list.includes(book.src)) {
            app_opt.shelf.list.push(book.src)
        }
        //
        const app_opt_src = paths().option
        UtilFs.write(app_opt_src, JSON.stringify(app_opt))
        //
        const opt_txt = JSON.stringify(book)
        const opt_src = path.join(book.src, FileAndDir.option)
        UtilFs.write(opt_src, opt_txt)
        //
        msg.b = true
        UtilReply.reply(e, 'book_add', msg)
    } catch (error) {
        UtilReply.reply(e, 'book_add', msg)
    }
}

function book_unlink(e: Electron.IpcMainEvent, book: book_vo) {
    const msg = UtilReply.msg(null)
    //
    try {
        const book_opt = OptionLoad.effect_load()
        const list2 = book_opt.shelf.list.filter((v) => v !== book.src)
        book_opt.shelf.list = list2
        const book_opt_src = paths().option
        UtilFs.write(book_opt_src, JSON.stringify(book_opt))
        //
        msg.b = true
        UtilReply.reply(e, 'book_unlink', msg)
    } catch (error) {
        UtilReply.reply(e, 'book_unlink', msg)
    }
}

/** 打开书目子窗口 */
function book_open_child_window(e: Electron.IpcMainEvent, book: book_vo) {
    const window_map = WindowUtil.child_map
    const maybe_has = window_map.get(book.id)
    if (maybe_has) {
        maybe_has.focus()
        return
    }
    const opt = WindowUtil.option
    // opt.title = book.name
    const child_win = new BrowserWindow(opt)
    child_win.maximize()
    WindowUtil.book_map.set(book.id, book)
    window_map.set(book.id, child_win)
    WindowUtil.load_page(child_win, `bookedit?bid=${book.id}`)
    // child_win.webContents.openDevTools()
    child_win.on('close', () => {
        console.log('关闭子窗口', book.id)
        window_map.set(book.id, false)
    })
}
