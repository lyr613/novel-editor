import { BehaviorSubject, Subject } from 'rxjs'
import { switchMap, take, filter, map } from 'rxjs/operators'
import { get_cur_book_src } from './book'
import { mk_uuid } from '@/function/id32'
import { shallowCopy } from '@/rx/shallow-copy'
import { fs_read, fs_write } from './fs-common'

/** 事件列表 */
export const incident_li$ = new BehaviorSubject<incident[]>([])
export const incident_use_id$ = new BehaviorSubject('')
export const incident_use$ = incident_li$.pipe(
    switchMap((li) => incident_use_id$.pipe(map((id) => li.find((v) => v.id === id)))),
)
export const incident_edit$ = new BehaviorSubject(of_incident())
export const incident_map$ = incident_li$.pipe(map(mk_incident_map))

export function mk_incident_map(li: incident[]) {
    const m = new Map<string, incident>()
    li.forEach((ot) => {
        m.set(ot.id, ot)
    })
    return m
}

export function edit_incident_auto() {
    incident_use$
        .pipe(
            take(1),
            shallowCopy(),
            map((v) => v ?? of_incident()),
        )
        .subscribe((npc) => {
            incident_edit$.next(npc)
        })
}
export function find_incident_li(book_src: string) {
    return fs_read<incident[]>('json', [book_src, 'incident']) || []
}

export function find_incident_li_auto() {
    incident_li$.next([])
    const bs = get_cur_book_src()
    const is = find_incident_li(bs)
    incident_li$.next(is)
}

/** 创造空事件 */
export function of_incident(part?: Object) {
    const re: incident = {
        id: mk_uuid(),
        label: '',
        text: '',
        life: ['0', '1', '1', '0', '1', '2'],
        npc_ids: [],
        link_line: {
            index: 1,
            start_node_id: '',
            end_node_id: '',
        },
        word: {
            preset: 0,
            real: 0,
        },
    }
    Object.assign(re, part)
    return re
}

export function save_incident_edited() {
    const edited = incident_edit$.value
    const li = [...incident_li$.value]
    const fi = li.findIndex((v) => v.id === edited.id)

    if (fi === -1) {
        li.push(edited)
    } else {
        li.splice(fi, 1, edited)
    }
    return save_incident_li(li)
}

function save_incident_li(li: incident[]) {
    const bs = get_cur_book_src()
    return fs_write('json', [bs, 'incident'], li)
}
