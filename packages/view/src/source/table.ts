import { BehaviorSubject, Subject } from 'rxjs'
import { fs_read, fs_write } from './fs-common'
import { book_use$, get_cur_book_src } from './book'
import { switchMap, map, take } from 'rxjs/operators'
import { mk_uuid } from '@/function/id32'

// table

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
export const table_system_li$ = new BehaviorSubject<system[]>([])
export const table_system_use_id$ = new BehaviorSubject('')
export const table_system_use$ = table_system_li$.pipe(
    switchMap((li) => table_system_use_id$.pipe(map((id) => li.find((v) => v.id === id)))),
)
export const table_system_edit$ = new BehaviorSubject<system>(of_table_system())

export const table_type_li$ = table_system_use$.pipe(map((v) => v?.types ?? []))
export const table_type_use_id$ = new BehaviorSubject('')
export const table_type_use$ = table_system_use$.pipe(
    switchMap((tb) =>
        table_type_use_id$.pipe(
            map((id) => {
                if (!tb) {
                    return null
                }
                return tb.types.find((v) => v.id === id)
            }),
        ),
    ),
)

export const table_cell_li$ = table_type_use$.pipe(map((v) => v?.cells ?? []))
export const table_cell_use_id$ = new BehaviorSubject('')
export const table_cell_use$ = table_type_use$.pipe(
    switchMap((tb) =>
        table_cell_use_id$.pipe(
            map((id) => {
                if (!tb) {
                    return null
                }
                return tb.cells.find((v) => v.id === id)
            }),
        ),
    ),
)

export function edit_table_system_use() {
    table_system_use$
        .pipe(
            take(1),
            map((v) => (v ? { ...v } : of_table_system())),
        )
        .subscribe((v) => {
            table_system_edit$.next(v)
        })
}

export function get_cur_table_edit() {
    const typid = table_type_use_id$.value
    const celid = table_cell_use_id$.value
    const system = table_system_edit$.value
    const type = system?.types.find((v) => v.id === typid)
    const cell = type?.cells.find((v) => v.id === celid)
    return { system, type, cell }
}

export function of_table_system(): system {
    return {
        id: mk_uuid(),
        name: '',
        types: [],
    }
}
export function of_table_type(): atype {
    return {
        id: mk_uuid(),
        name: '',
        cells: [],
    }
}
export function of_table_cell(): cell {
    return {
        id: mk_uuid(),
        name: '',
        level: 0,
        description: '',
    }
}

function find_table_li() {
    return fs_read<null | system[]>('json', [get_cur_book_src(), 'table.json']) || []
}

export function find_table_li_auto() {
    table_system_li$.next([])
    const li = find_table_li()
    table_system_li$.next(li)
}
export function save_table_edited() {
    const edited = table_system_edit$.value
    const li = [...table_system_li$.value]
    const fi = li.findIndex((v) => v.id === edited.id)

    if (fi === -1) {
        li.push(edited)
    } else {
        li.splice(fi, 1, edited)
    }
    return save_table_li(li)
}
export function save_table_li(li: system[]) {
    return fs_write('json', [get_cur_book_src(), 'table.json'], li)
}
