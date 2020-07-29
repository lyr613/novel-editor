import { Subject, BehaviorSubject, timer, of, ReplaySubject, interval } from 'rxjs'
import { map, filter, switchMap, tap, take, debounceTime, skip } from 'rxjs/operators'
import { ipc, ENV } from '@/const'
import { book_use$, get_cur_book_src } from './book'
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
        const arr = [...buffer, fi].slice(-8)
        node_use_buffer$.next(arr)
    }
}
/** 根据id列表向编辑页buffer添加多个 */
export function node_buffer_add_by_ids(ids: string[], node_list?: node[]) {
    const arr = node_list || get_now_node_list()
    const nmap = new Map<string, boolean>()
    ids.forEach((id) => {
        nmap.set(id, true)
    })
    const fis = arr.filter((v) => nmap.get(v.id))
    if (!fis.length) {
        return
    }
    const next_buffer = [...node_use_buffer$.value]
    fis.forEach((node) => {
        if (!next_buffer.find((v) => v.id === node.id)) {
            next_buffer.push(node)
            if (next_buffer.length > 8) {
                next_buffer.shift()
            }
        }
    })
    node_use_buffer$.next(next_buffer)
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
book_use$.pipe(debounceTime(10)).subscribe(() => {
    node_use_buffer$.next([])
    node_text_from_fs$.next('')
    node_use$.next(null)
})

const node_text_from_fs_finder$ = node_use$.pipe(
    filter((v) => !!v),
    map((node) => {
        const booksrc = get_cur_book_src()
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

/** 更新buffer时, 储存到硬盘以便下次直接打开 */
node_use$
    .pipe(
        switchMap(() => node_use_buffer$),
        debounceTime(500),
    )
    .subscribe((buf) => {
        const booksrc = get_cur_book_src()
        if (!booksrc) {
            return
        }
        const ids = buf.map((v) => v.id)
        const use_id = node_use$.value?.id ?? ''
        const dto = {
            ids,
            use_id,
        }
        fs_write('json', [booksrc, 'prev-edit'], dto)
    })

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

    node_buffer_add_by_ids(dto.ids)

    const nodeall = get_now_node_list()
    const fiuse = nodeall.find((v) => v.id === dto.use_id)
    if (fiuse) {
        node_use$.next(fiuse)
    }
}
