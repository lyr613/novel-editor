import { Subject, BehaviorSubject, timer, of, ReplaySubject, interval } from 'rxjs'
import { map, filter, switchMap, tap, take, debounceTime, skip } from 'rxjs/operators'
import { ipc, ENV } from '@/const'
import { book_use$, get_cur_book_src } from './book'
import { fs_write, fs_read } from './fs-common'
import { get_now_node_list } from './chapter-node'
import { next_router } from '@/function/router'
import { push_node_edit_id_stack } from './node/stack'

/** 聚焦的节 */
export const node_use$ = new BehaviorSubject<null | node>(null)

/** 选中一个节, 并跳到编辑页开始编辑 */
export function focu_node_then_edit(id: string) {
    const nodes = get_now_node_list()
    const fi = nodes.find((v) => v.id === id)

    if (fi) {
        push_node_edit_id_stack([id])
        node_use$.next(fi)
        next_router('edit')
    }
}

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
