import { BehaviorSubject, Subject, of } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { ipc } from '@/const'
import { editer_setting$ } from '@/subject'
import { id32 } from '@/function/id32'

/** 获取书目列表 */
export const book_find$ = new Subject<Param | null>()

/** 书目列表 */
export const book_list$ = new BehaviorSubject<book[]>([])

/** 聚焦的书目 */
export const book_focu$ = new BehaviorSubject<null | book>(null)

/**
 * 获取书目列表
 */
book_find$
    .pipe(
        switchMap(() => {
            return editer_setting$.pipe(map((v) => v.shelf.book_list))
        }),
        map((srcs) => {
            const books = ipc().sendSync('load_books', srcs) || []
            return books.filter(Boolean)
        }),
    )
    .subscribe((li) => {
        book_list$.next(li)
        // book_local.next(li)
    })

/** 创建一本新书 */
export function of_book(part?: Param | book): book {
    const re: book = {
        id: id32(),
        name: '',
        src: '',
        cover: '',
    }
    Object.assign(re, part)
    return re
}

// 0----0
// 切换书时, 改app标题
book_focu$.subscribe((bk) => {
    if (bk?.name) {
        document.title = bk.name
    }
})
