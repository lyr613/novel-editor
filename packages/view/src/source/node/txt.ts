import { BehaviorSubject, Subject } from 'rxjs'
import { node_use$ } from './base'
import { switchMap, map, debounceTime } from 'rxjs/operators'
import { book_use$ } from '../book'
import { fs_read, fs_write } from '../fs-common'

/** 节点内容, 因为monaco-editer不好受控, 所以这里不储存值, 只在查找时负责传递 */
export const node_text_from_fs$ = node_use$.pipe(
    switchMap((use) =>
        book_use$.pipe(
            map((book) => {
                if (!book || !use) {
                    return ''
                }
                return fs_read('txt', [book.src, 'chapters', use.id]) || ''
            }),
        ),
    ),
)

interface node_txt_saver {
    book_src: string
    node_id: string
    node_name: string
    text: string
}
/** 保存节文本 */
export const node_text_saver$ = new Subject<node_txt_saver>()

const node_txt_save_map = new Map<string, node_txt_saver>()

node_text_saver$.subscribe((v) => {
    node_txt_save_map.set(v.node_id, v)
})
node_text_saver$.pipe(debounceTime(1500)).subscribe(() => {
    const m = node_txt_save_map
    m.forEach((v, k) => {
        try {
            fs_write('txt', [v.book_src, 'chapters', v.node_id + '.txt'], v.text)
            m.delete(k)
        } catch (error) {
            alert(`保存章节${v.node_name}失败`)
        }
    })
})
