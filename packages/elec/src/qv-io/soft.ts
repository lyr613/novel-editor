// 会尽力的返回一个成功的结果
import fs from 'fs'
import { be_dir, be_file } from './common'

/**
 * 读取文本
 * @param src
 */
export function read_text(src: string): string {
    try {
        const r = fs.readFileSync(src)
        return r.toString('utf-8')
    } catch (error) {
        return ''
    }
}

/**
 * 写文本
 * @param src
 * @param text
 */
export function write_text(src: string, text: string) {
    try {
        fs.writeFileSync(src, text)
        return true
    } catch (error) {
        return false
    }
}

/**
 * 删除文件
 * @param src
 */
export function delete_file(src: string) {
    try {
        fs.unlinkSync(src)
        return true
    } catch (error) {
        return false
    }
}
