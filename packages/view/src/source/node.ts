import { Subject, BehaviorSubject, timer, of, ReplaySubject, interval } from 'rxjs'
import { map, filter, switchMap, tap, take, debounceTime } from 'rxjs/operators'
import { ipc, ENV } from '@/const'
import { book_use$ } from './book'
import { fs_write, fs_read } from './fs-common'
import { get_now_node_list } from './chapter-node'
import { next_router } from '@/function/router'

/** 聚焦的节 */
export const node_use$ = new BehaviorSubject<null | node>(null)

/** 编辑页顶部的节标签 */
export const node_use_buffer$ = new BehaviorSubject<node[]>([])

/** 根据id向编辑页buffer添加一个 */
export function node_buffer_add_by_id(id: string, node_list?: node[]) {
    const arr = node_list || get_now_node_list()
    const fi = arr.find((v) => v.id === id)
    if (!fi) {
        return
    }
    const buffer = node_use_buffer$.value
    if (!buffer.find((v) => v.id === id)) {
        const arr = [...buffer, fi].slice(-5)
        node_use_buffer$.next(arr)
    }
}

/** 选中一个节, 并跳到编辑页开始编辑 */
export function focu_node_then_edit(id: string) {
    const nodes = get_now_node_list()
    const fi = nodes.find((v) => v.id === id)

    if (fi) {
        node_buffer_add_by_id(id, nodes)
        node_use$.next(fi)
        next_router('edit')
    }
}

/** 节点内容, 因为monaco-editer不好受控, 所以这里不储存值, 只在查找时负责传递 */
export const node_text_from_fs$ = new BehaviorSubject<string>('')
/** 从编辑器传来的文本 */
export const node_text_from_editer$ = new BehaviorSubject('')

// ---- 自动保存部分 ----
const node_id_text_map_default = new Map<
    string,
    { book_src: string; text: string; node_id: string; node_name: string }
>()
/** 从编辑器传来的 node_id: text的映射表, 用于保存 */
export const node_id_text_map$ = new BehaviorSubject(node_id_text_map_default)
/** 自动保存 */
node_id_text_map$.pipe(debounceTime(2000)).subscribe((m) => {
    m.forEach((v, k) => {
        try {
            fs_write('txt', [v.book_src, 'chapters', v.node_id + '.txt'], v.text)
            m.delete(k)
        } catch (error) {
            alert(`保存章节${v.node_name}失败`)
        }
    })
})

// ----

// 当切换书时, 清空buffer和text
book_use$.pipe(debounceTime(0)).subscribe(() => {
    node_use_buffer$.next([])
    node_text_from_fs$.next('')
    node_use$.next(null)
})

const node_text_from_fs_finder$ = node_use$.pipe(
    filter((v) => !!v),
    map((node) => {
        const booksrc = book_use$.value?.src
        if (booksrc) {
            return fs_read('txt', [booksrc, 'chapters', node!.id]) || ''
        }
        return ''
    }),
)

/** 方便的读取节的文本, 执行即可 */
export function find_node_text_from_fs_auto() {
    node_text_from_fs_finder$.pipe(take(1)).subscribe((text) => {
        node_text_from_fs$.next(text)
    })
}
