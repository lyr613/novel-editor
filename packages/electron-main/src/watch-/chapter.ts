import { ipcMain, shell, dialog, app } from 'electron'
import { reply } from 'util-/reply'
import { WindowUtil } from 'window-'
import path from 'path'
import fs from 'fs-extra'
import { FileAndDir } from 'const-/file-and-dir'
import { effect_fs_mk_dir, effect_fs_read_json } from 'util-/fs'
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
        const jn = effect_fs_read_json<volume_vo[]>(chasrc)

        reply(e, 'chapter_load', jn)
    } catch (error) {
        // 不会触发err
        reply(e, 'chapter_load', false)
    }
}

function chapter_save(e: Electron.IpcMainEvent, bookid: string, vols: volume_vo[]) {
    const book = WindowUtil.book_map.get(bookid)!
    try {
        const chasrc = path.join(book.src, FileAndDir.volume)
        const t0 = JSON.stringify(vols)
        const t1 = HelpPrettier.json(t0)
        fs.writeFileSync(chasrc, t1)

        reply(e, 'chapter_save', true)
    } catch (error) {
        // 不会触发err
        reply(e, 'chapter_save', false)
    }
}

/** 章读取文本 */
function chapter_load_txt(e: Electron.IpcMainEvent, bookid: string, chapid: string) {
    const book = WindowUtil.book_map.get(bookid)!
    try {
        const chasrc = path.join(book.src, FileAndDir.vol_dir, chapid)
        const txt = fs.readFileSync(chasrc, 'utf-8')
        reply(e, 'chapter_load_txt', txt)
    } catch (error) {
        reply(e, 'chapter_load_txt', '')
    }
}
/** 章写入文本 */
function chapter_write_txt(e: Electron.IpcMainEvent, bookid: string, chapid: string, txt: string) {
    const book = WindowUtil.book_map.get(bookid)!
    try {
        const dirsrc = path.join(book.src, FileAndDir.vol_dir)
        effect_fs_mk_dir(dirsrc)
        const chasrc = path.join(book.src, FileAndDir.vol_dir, chapid)
        fs.writeFileSync(chasrc, txt)
        reply(e, 'chapter_write_txt', true)
    } catch (error) {
        reply(e, 'chapter_write_txt', false)
    }
}
