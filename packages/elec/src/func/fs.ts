import fs from 'fs-extra'
import path from 'path'

/** 检查是否为书目目录 */
export function check_booksrc(src: string) {
    src = src.trim()
    if (!src) {
        throw ''
    }
    if (!fs.existsSync(src)) {
        throw ''
    }
}

/** 获取章节目录 */
export function get_chapters(book_src: string) {
    try {
        check_booksrc(book_src)
        const cpsrc = path.resolve(book_src, 'chapter.json')
        const txt = fs.readFileSync(cpsrc, 'utf-8')
        const jsn: chapter_dto[] = JSON.parse(txt)
        return jsn
    } catch (error) {
        return []
    }
}
