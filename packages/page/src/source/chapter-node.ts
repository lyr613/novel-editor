import { BehaviorSubject, Subject, of } from 'rxjs'
import { debounceTime, tap, switchMap, map, catchError, filter, take } from 'rxjs/operators'
import { book_use$, get_cur_book_src } from './book'
import { mk_uuid } from '@/util/id32'
import { fs_write, fs_read } from './fs-common'
/** 章节列表 */
export const chapter_li$ = new BehaviorSubject<chapter[]>([])

function find_chapter_li(book_src: string) {
    const cps = fs_read<chapter[]>('json', [book_src, 'chapter'])
    return cps || []
}
/** 方便的更新章节列表, 执行即可 */
export function find_chapter_li_auto() {
    chapter_li$.next([])
    const bs = get_cur_book_src()
    const cps = find_chapter_li(bs)
    chapter_li$.next(cps)
}
export const chapter_use$ = new BehaviorSubject<null | chapter>(null)

export const chapter_map$ = chapter_li$.pipe(
    map((li) => {
        const m = new Map<string, chapter>()
        li.forEach((ot) => {
            m.set(ot.id, ot)
        })
        return m
    }),
)

/** 储存章节列表 */
export function save_chapter_li() {
    const arr = chapter_li$.value
    return fs_write('json', [get_cur_book_src(), 'chapter'], arr)
}

/** 创造一个章 */
export function chapter_of(shard: Object): chapter {
    const re = {
        id: mk_uuid(),
        name: '',
        children: [],
        hidden: false,
        expand: true,
    }
    Object.assign(re, shard)
    return re
}

/** 创造一个节 */
export function node_of(shard?: Object): node {
    const re: node = {
        id: mk_uuid(),
        name: '',
        hidden: false,
        chapter_id: '',
    }
    Object.assign(re, shard)
    return re
}

/** 获取当前的节列表 */
export function get_now_node_list() {
    const cps = chapter_li$.value
    const re: node[] = []
    cps.forEach((cp) => {
        cp.children.forEach((nd) => {
            re.push(nd)
        })
    })
    return re
}
