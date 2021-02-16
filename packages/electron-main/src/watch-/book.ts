import { ipcMain, shell, dialog, app } from 'electron'
import { reply } from 'util-/reply'
import { get_main_window } from 'window-'
import path from 'path'
import fs from 'fs-extra'
import { mk_uuid } from 'util-/uuid'
import { OptionLoad } from './option'
import { paths } from 'const-/path'

/** 书目 */
export function _watch_book() {
    ipcMain.on('load_book_li', load_book_li)
    ipcMain.on('book_add', book_add)
}

function load_book_li(e: Electron.IpcMainEvent, srcs: string[]) {
    const re: book_vo[] = srcs.map(_load_book)
    reply(e, 'load_book_li', re)
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
