import { ipcMain, shell, dialog, app } from 'electron'
import { UtilReply } from 'util-/reply'
import { WindowUtil } from 'window-'
import path from 'path'
import fs from 'fs-extra'
import { FileAndDir } from 'const-/file-and-dir'
import { UtilFs } from 'util-/fs'
import { HelpPrettier } from 'util-/prett'

/**   */
export function _watch_chapter() {
    ipcMain.on('chapter_load', chapter_load)
    ipcMain.on('chapter_save', chapter_save)
    ipcMain.on('chapter_load_txt', chapter_load_txt)
    ipcMain.on('chapter_write_txt', chapter_write_txt)
}

/** 读取书的章节 */
function chapter_load(e: Electron.IpcMainEvent, bookid: string) {
    const book = WindowUtil.book_map.get(bookid)!
    try {
        const chasrc = path.join(book.src, FileAndDir.volume)
        const msg = UtilFs.read_json<volume_vo[]>(chasrc)
        UtilReply.reply(e, 'chapter_load', msg)
    } catch (error) {
        // 不会触发err
    }
}

function chapter_save(e: Electron.IpcMainEvent, bookid: string, vols: volume_vo[]) {
    const book = WindowUtil.book_map.get(bookid)!
    const msg = UtilReply.msg(null)
    try {
        const chasrc = path.join(book.src, FileAndDir.volume)
        const t0 = JSON.stringify(vols)
        const t1 = HelpPrettier.json(t0)
        fs.writeFileSync(chasrc, t1)
        msg.b = true
        UtilReply.reply(e, 'chapter_save', msg)
    } catch (error) {
        // 不会触发err
        UtilReply.reply(e, 'chapter_save', msg)
    }
}

/** 章读取文本 */
function chapter_load_txt(e: Electron.IpcMainEvent, bookid: string, chapid: string) {
    const book = WindowUtil.book_map.get(bookid)!
    const chasrc = path.join(book.src, FileAndDir.vol_dir, chapid)
    const msg = UtilFs.read(chasrc)
    UtilReply.reply(e, 'chapter_load_txt', msg)
}
/** 章写入文本 */
function chapter_write_txt(e: Electron.IpcMainEvent, bookid: string, chapid: string, txt: string) {
    const book = WindowUtil.book_map.get(bookid)!
    const msg = UtilReply.msg(null)
    try {
        const dirsrc = path.join(book.src, FileAndDir.vol_dir)
        UtilFs.mk_dir(dirsrc)
        const chasrc = path.join(book.src, FileAndDir.vol_dir, chapid)
        fs.writeFileSync(chasrc, txt)
        msg.b = true
        UtilReply.reply(e, 'chapter_write_txt', msg)
    } catch (error) {
        UtilReply.reply(e, 'chapter_write_txt', msg)
    }
}
