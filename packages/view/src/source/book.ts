import { BehaviorSubject, Subject, of } from 'rxjs'
import { map, switchMap, take } from 'rxjs/operators'
import { ipc } from '@/const'
import { editer_setting$ } from '@/subject'
import { id32 } from '@/function/id32'

/** 书目列表 */
export const book_list$ = new BehaviorSubject<book[]>([])

export const book_use_id$ = new BehaviorSubject('')

/** 聚焦的书目 */
export const book_use$ = book_list$.pipe(switchMap((li) => book_use_id$.pipe(map((id) => li.find((v) => v.id === id)))))

/** 方便获取当前书的路径, 空为空字符串 */
export function get_cur_book_src() {
    let re = ''
    book_use$.pipe(take(1)).subscribe((b) => {
        re = b?.src ?? ''
    })
    return re
}

function find_book(srcs: string[]): book[] {
    const re = ipc().sendSync('load_books', srcs) || []
    return re
}

/** 更新书目列表的简单方法, 调用即更新 */
export function load_books_auto() {
    editer_setting$
        .pipe(
            take(1),
            map((v) => v.shelf.book_list ?? []),
            map(find_book),
        )
        .subscribe((li) => {
            book_list$.next(li)
        })
}

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
book_use$.subscribe((bk) => {
    if (bk?.name) {
        document.title = bk.name
    }
})
