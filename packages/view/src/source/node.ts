import { Subject, BehaviorSubject, timer, of, ReplaySubject, interval } from 'rxjs'
import { map, filter, switchMap, tap, take, debounceTime } from 'rxjs/operators'
import { ipc, ENV } from '@/const'
import { book_focu$ } from './book'
import { fs_write, fs_read } from './fs-common'
import { get_now_node_list } from './chapter-node'
import { next_router } from '@/function/router'

/** 聚焦的节 */
export const node_focu$ = new BehaviorSubject<null | node>(null)

export const node_focu_buffer$ = new BehaviorSubject<node[]>([])

/** 根据id向buffer添加一个 */
export function node_buffer_add_by_id(id: string, node_list?: node[]) {
    const arr = node_list || get_now_node_list()
    const fi = arr.find((v) => v.id === id)
    if (!fi) {
        return
    }
    const buffer = node_focu_buffer$.value
    if (!buffer.find((v) => v.id === id)) {
        const arr = [...buffer, fi].slice(-5)
        node_focu_buffer$.next(arr)
    }
}

/** 选中一个节, 并跳到编辑页开始编辑 */
export function focu_node_then_edit(id: string) {
    const nodes = get_now_node_list()
    const fi = nodes.find((v) => v.id === id)

    if (fi) {
        node_buffer_add_by_id(id, nodes)
        node_focu$.next(fi)
        next_router('edit')
        node_text_from_fs_find$.next()
    }
}

/** 节点内容, 因为monaco-editer不好受控, 所以这里不储存值, 只在查找时负责传递 */
export const node_text_from_fs$ = new BehaviorSubject<string>('')
/** 从编辑器传来的文本 */
export const node_text_from_editer$ = new BehaviorSubject('')
const node_id_text_map_default = new Map<
    string,
    { book_src: string; text: string; node_id: string; node_name: string }
>()
/** 从编辑器传来的 node_id: text的映射表 */
export const node_id_text_map$ = new BehaviorSubject(node_id_text_map_default)
/** 节文本可以自动保存 */
export const can_node_text_auto_save$ = new BehaviorSubject(true)

/** 订阅自动保存 */
can_node_text_auto_save$
    .pipe(
        switchMap((b) => {
            if (b) {
                return interval(5000)
            }
            return of(null)
        }),
        filter((v) => v !== null),
    )
    .subscribe(() => {
        save_node_text()
    })
/** 保存文本 */
export function save_node_text() {
    const m = node_id_text_map$.value
    m.forEach((v, k) => {
        try {
            fs_write('txt', [v.book_src, 'chapters', v.node_id + '.txt'], v.text)
            m.delete(k)
        } catch (error) {
            alert(`保存章节${v.node_name}失败`)
        }
    })
}

// 当切换书时, 清空buffer和text
book_focu$.pipe(debounceTime(0)).subscribe(() => {
    node_focu_buffer$.next([])
    node_text_from_fs$.next('')
    node_focu$.next(null)
})

/** 读取节点内容 */
export const node_text_from_fs_find$ = new Subject()

/** 读取节点内容 */
node_text_from_fs_find$
    .pipe(
        map(() => node_focu$.value!),
        filter((v) => !!v),
        map((node) => {
            const src = node.id
            const booksrc = book_focu$.value?.src
            if (booksrc) {
                return fs_read('txt', [booksrc, 'chapters', node.id]) || ''
            }

            return ''
        }),
    )
    .subscribe((text) => {
        node_text_from_fs$.next(text)
    })

// class NodeTextAutoSave {w
