import { BehaviorSubject, Subject, of } from 'rxjs'
import { electron, ENV, ipc } from '@/const'
import { debounceTime, tap, switchMap, map, catchError, filter } from 'rxjs/operators'
import { book_focu$ } from './book'
import { chapter_node_find_ipc } from './ipc/chapter-node'
import { id32 } from '@/function/id32'
import { fs_write } from './fs-common'
/** 章节列表 */
export const chapter_list$ = new BehaviorSubject<chapter[]>([])

export const chapter_focu$ = new BehaviorSubject<null | chapter>(null)

/** 聚焦节的内容 */
export const edit_txt$ = new BehaviorSubject('')

/** 更新章节列表 */
export const chapter_list_find$ = new Subject()

export const chapter_map$ = chapter_list$.pipe(
    map((li) => {
        const m = new Map<string, chapter>()
        li.forEach((ot) => {
            m.set(ot.id, ot)
        })
        return m
    }),
)

/** 查找章节列表  */
chapter_list_find$
    .pipe(
        map(() => {
            const src = book_focu$.value?.src
            if (!src) {
                return []
            }
            return chapter_node_find_ipc(src)
        }),
        // switchMap(() => {
        // 	const src = book_focu$.value?.src
        // 	if (!src) {
        // 		return of([] as chapter[])
        // 	}
        // 	if (ENV === 'electron') {
        // 		return chapter_node_find_ipc(src)
        // 	}
        // 	return of([] as chapter[])
        // }),
        // catchError((err: any) => of(null)),
    )
    .subscribe((li) => {
        if (li) {
            chapter_list$.next(li)
        }
    })

/** 储存章节列表 */
export function chapter_save() {
    const book = book_focu$.value!
    const arr = chapter_list$.value
    return fs_write('json', [book.src, 'chapter'], arr)
}

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

/** 创造一个伪节点 */
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
