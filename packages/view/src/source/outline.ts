import { Subject, BehaviorSubject, ReplaySubject, of } from 'rxjs'
import { ipc, ENV } from '@/const'
import { switchMap, map, filter, take } from 'rxjs/operators'
import { book_use$ } from './book'
import { fs_read } from './fs-common'

/** 读取文件的类型, id为章id或all */
interface outline_file {
    [id: string]: outline
}

/** 查询大纲 */
export const outline_find$ = new Subject()
/** 编辑的大纲 */
export const outline_focu$ = new BehaviorSubject<outline | null>(null)

export const outline_map$ = new BehaviorSubject<outline_file>({})

outline_find$
    .pipe(
        map(() => {
            return book_use$.value?.src!
        }),
        filter((src) => !!src),
        map((book_src) => {
            return fs_read<outline_file>('json', [book_src, 'outline'])
        }),
    )
    .subscribe((mp) => {
        if (mp) {
            outline_map$.next(mp)
        } else {
            outline_map$.next({})
        }
    })

/** 创造一个空白大纲 */
export function of_outline(part?: Param) {
    const re: outline = {
        id: 'all',
        text: '',
        incident_ids: [],
    }
    Object.assign(re, part)
    return re
}
