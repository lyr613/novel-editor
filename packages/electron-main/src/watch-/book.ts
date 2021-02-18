import { ipcMain, shell, dialog, app, BrowserWindow } from 'electron'
import { reply } from 'util-/reply'
import path from 'path'
import fs from 'fs-extra'
import { mk_uuid } from 'util-/uuid'
import { OptionLoad } from './option'
import { paths } from 'const-/path'
import { WindowUtil } from 'window-'

/** 书目 */
export function _watch_book() {
    const li = [load_book_li, load_book, book_add, book_open_child_window]
    for (const fun of li) {
        ipcMain.on(fun.name, fun)
    }
}

/** 加载书目列表 */
function load_book_li(e: Electron.IpcMainEvent, srcs: string[]) {
    const re: book_vo[] = srcs.map(_load_book)
    reply(e, 'load_book_li', re)
}

/** 加载一本书 */
function load_book(e: Electron.IpcMainEvent, bid: string) {
    const bk = WindowUtil.book_map.get(bid)
    if (!bk) {
        reply(e, 'load_book', null)
        return
    }
    reply(e, 'load_book', bk)
}

function _load_book(src: string): book_vo {
    const opt_src = path.join(src, 'opt.json')
    try {
        const opt_txt = fs.readFileSync(opt_src, 'utf-8')
        const opt = JSON.parse(opt_txt)
        return {
            id: opt.id,
            name: opt.name,
            src: src,
            cover: '',
            git: false,
        }
    } catch (error) {
        return {
            id: mk_uuid(),
            name: '查找失败',
            src: src,
            cover: '',
            git: false,
        }
    }
}

/** 添加一本书 */
function book_add(e: Electron.IpcMainEvent, book: book_vo) {
    const opt_txt = JSON.stringify(book)
    const opt_src = path.join(book.src, 'opt.json')
    fs.writeFileSync(opt_src, opt_txt)
    //
    const book_opt = OptionLoad.effect_load()
    book_opt.shelf.list.push(book.src)
    const book_opt_src = paths().option
    fs.writeFileSync(book_opt_src, JSON.stringify(book_opt))
    //
    reply(e, 'book_add', true)
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
    opt.title = book.name
    const child_win = new BrowserWindow(opt)
    child_win.maximize()
    WindowUtil.load_page(child_win, `bookedit?bid=${book.id}`)
    window_map.set(book.id, child_win)
    WindowUtil.book_map.set(book.id, book)
    child_win.on('close', () => {
        console.log('关闭子窗口', book)
        window_map.set(book.id, false)
    })
}
