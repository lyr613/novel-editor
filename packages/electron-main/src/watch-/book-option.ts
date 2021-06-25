import { ConstBookPath } from 'const-/book-path'
import { ipcMain, shell, dialog, app } from 'electron'
import { UtilFs } from 'util-/fs'
import { UtilReply } from 'util-/reply'
import { UtilSortName } from 'util-/sort-name'
import { WindowUtil } from 'window-'
import fs from 'fs-extra'
import path from 'path'
class _o {
    watch() {
        ipcMain.on('book_option_load', (e, book_id) => {
            const msg = this.load(book_id)
            UtilReply.reply(e, 'book_option_load', msg)
        })
        ipcMain.on('book_option_save', (e, book_id, opt) => {
            const msg = this.save(book_id, opt)
            UtilReply.reply(e, 'book_option_save', msg)
        })
        ipcMain.on('book_set_cover', (e, book_src, source) => {
            const msg = this.book_set_cover(e, book_src, source)
            UtilReply.reply(e, 'book_set_cover', msg)
        })
    }
    /** 读取 */
    load(bookid: string) {
        const book = WindowUtil.book_map.get(bookid)!
        const json_src = ConstBookPath.full_src(book.src, 'option')
        const msg = UtilFs.read_json<any>(json_src)
        return msg
    }
    /** 保存 */
    save(bookid: string, opt: any) {
        const book = WindowUtil.book_map.get(bookid)!
        const msg = UtilReply.msg(null)
        try {
            const chasrc = ConstBookPath.full_src(book.src, 'option')
            const t0 = JSON.stringify(opt)
            UtilFs.write(chasrc, t0)
            msg.b = true
        } catch (error) {
            // 不会触发err
        }
        return msg
    }
    /** 设置封面 */
    book_set_cover(e: any, book_src: string, src_source: string) {
        const msg = UtilReply.msg('')
        const bn = path.extname(src_source)
        const src_dir = path.join(book_src, 'img')
        const src_tar = path.join(src_dir, 'cover' + bn)
        // console.log(src_dir)

        if (!fs.existsSync(src_dir)) {
            console.log('创建图片文件夹')

            fs.mkdirSync(src_dir)
        }
        fs.copyFileSync(src_source, src_tar)
        msg.data = path.basename(src_tar)
        return msg
    }
}

/** 每本书独立配置 */
export const WatchBookOption = new _o()
