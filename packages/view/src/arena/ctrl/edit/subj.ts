import { BehaviorSubject } from 'rxjs'
import * as monaco from 'monaco-editor'
import { get_cur_book_src } from '@/source/book'
import { fs_read } from '@/source/fs-common'
import { push_node_edit_id_stack } from '@/source/node/stack'
import { get_now_node_list } from '@/source/chapter-node'
import { node_use$ } from '@/source/node/base'
import { map, merge } from 'rxjs/operators'
import { node_text_saver$, node_text_from_fs$ } from '@/source/node/txt'

/** 在编辑章节页 */
export const editing_chapter$ = new BehaviorSubject(false)

/** 记录字数 */
export const word_count$ = node_text_saver$.pipe(
    map((v) => v.text),
    merge(node_text_from_fs$),
    map((t) => {
        return t.replace(/[^\u4e00-\u9fa5]/g, '').length
    }),
)

/** 编辑页使用此方法, 加载上一次的编辑, 如果已经有buffer, 则不加载 */
export function load_prev_buffer() {
    const booksrc = get_cur_book_src()
    if (!booksrc) {
        return
    }
    const dto = fs_read('json', [booksrc, 'prev-edit'], (s: any) => {
        return s
            ? {
                  ids: s.ids,
                  use_id: s.use_id,
              }
            : null
    })
    if (!dto) {
        return
    }
    push_node_edit_id_stack(dto.ids)

    const nodeall = get_now_node_list()
    const fiuse = nodeall.find((v) => v.id === dto.use_id)
    if (fiuse) {
        node_use$.next(fiuse)
    }
}
