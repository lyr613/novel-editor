import { BehaviorSubject, Subject } from 'rxjs'
import { fs_read } from './fs-common'
import { book_use$ } from './book'

interface cell {
    id: string
    level: number
    name: string
    description: string
}
interface atype {
    id: string
    name: string
    cells: cell[]
}
interface system {
    id: string
    name: string
    types: atype[]
}

/** 表格设定列表 */
export const table_list$ = new BehaviorSubject<system[]>([])

/** 查找表格设定列表 */
export const table_list_find$ = new Subject()

table_list_find$.subscribe(() => {
    if (!book_use$.value?.src) {
        return
    }
    const txt = fs_read<null | system[]>('json', [book_use$.value!.src, 'data-settings.json'])
    if (txt) {
        table_list$.next(txt)
    }
})
