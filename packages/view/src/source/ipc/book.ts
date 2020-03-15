import { ipc } from '@/const'

/** 通过路径列表获取书目列表 */
export function load_book_ipc(li: string[]): Promise<Param[]> {
    return new Promise((res) => {
        const re: Param[] = ipc().sendSync('book-load-srcs', li)
        res(re)
    })
}
