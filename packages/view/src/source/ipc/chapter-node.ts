import { ipc } from '@/const'
import { fs_write, fs_read } from '@/source'

/**
 * ipc获取章节列表
 * @param src 书路径
 */
export function chapter_node_find_ipc(src: string) {
    return fs_read('json', [src, 'chapter'], (s) => {
        return s as chapter[]
    })
}
