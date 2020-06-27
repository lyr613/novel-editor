import { BehaviorSubject, Subject, of } from 'rxjs'
import { electron, ENV, ipc } from '@/const'
import { debounceTime, tap, switchMap, map, catchError, filter, take } from 'rxjs/operators'
import { book_use$, get_cur_book_src } from './book'
import { id32 } from '@/function/id32'
import { fs_write, fs_read } from './fs-common'
/** 章节列表 */
export const chapter_list$ = new BehaviorSubject<chapter[]>([])

export const find_chapter_list$ = book_use$.pipe(
    take(1),
    filter((v) => !!v?.src),
    map((v) => v?.src || ''),
    switchMap((book_src) => {
        return new Promise<chapter[]>((suc) => {
            fs_read('json', [book_src, 'chapter'], (s: any) => {
                s.forEach((vv: any) => {
                    vv.expand = false
                })
                suc((s as chapter[]) || [])
            })
        })
    }),
)
/** 方便的更新章节列表, 执行即可 */
export function find_chapter_list_auto() {
    chapter_list$.next([])
    find_chapter_list$.subscribe((li) => {
        chapter_list$.next(li)
    })
}
export const chapter_use$ = new BehaviorSubject<null | chapter>(null)

export const chapter_map$ = chapter_list$.pipe(
    map((li) => {
        const m = new Map<string, chapter>()
        li.forEach((ot) => {
            m.set(ot.id, ot)
        })
        return m
    }),
)

/** 储存章节列表 */
export function chapter_save() {
    const arr = chapter_list$.value
    return fs_write('json', [get_cur_book_src(), 'chapter'], arr)
}

/** 创造一个章 */
export function of_chapter(shard: Object): chapter {
    const re = {
        id: id32(),
        name: '',
        children: [],
        hidden: false,
        expand: true,
    }
    Object.assign(re, shard)
    return re
}

/** 创造一个节 */
export function of_node(shard?: Object): node {
    const re: node = {
        id: id32(),
        name: '',
        hidden: false,
        chapter_id: '',
    }
    Object.assign(re, shard)
    return re
}

/** 获取当前的节列表 */
export function get_now_node_list() {
    const cps = chapter_list$.value
    const re: node[] = []
    cps.forEach((cp) => {
        cp.children.forEach((nd) => {
            re.push(nd)
        })
    })
    return re
}
