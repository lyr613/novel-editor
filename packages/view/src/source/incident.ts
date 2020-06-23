import { BehaviorSubject, Subject } from 'rxjs'
import { switchMap, take, filter, map } from 'rxjs/operators'
import { book_use$, get_cur_book_src } from './book'
import { ipc } from '@/const'
import { id32 } from '@/function/id32'

/** 事件列表 */
export const incident_list$ = new BehaviorSubject<incident[]>([])

export const incident_focu$ = new BehaviorSubject<incident | null>(null)
/** 查找事件列表 */
export const incident_find$ = new Subject()

export const incident_map$ = incident_list$.pipe(
    map((li) => {
        const m = new Map<string, incident>()
        li.forEach((ot) => {
            m.set(ot.id, ot)
        })
        return m
    }),
)

incident_find$
    .pipe(
        map(() => get_cur_book_src()),
        filter((v) => !!v),
        switchMap((src) => {
            return incident_find_ip(src)
        }),
    )
    .subscribe((li) => {
        incident_list$.next(li)
    })
function incident_find_ip(book_src: string) {
    return new Promise<incident[]>((res) => {
        const li = ipc().sendSync('incident-find', book_src)
        res(li)
    })
}

/** 创造空事件 */
export function of_incident(part?: Object) {
    const re: incident = {
        id: id32(),
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

/** 事件编辑完成 */
export const incident_edit$ = new Subject()

/** 事件提交结果 */
export const incident_edit_re$ = incident_edit$.pipe(
    switchMap(() => incident_focu$),
    filter((v) => !!v),
    take(1),
    switchMap((incident) => {
        return incident_edit_ipc(get_cur_book_src(), incident!)
    }),
)

function incident_edit_ipc(book_src: string, incident: incident) {
    return new Promise<boolean>((res) => {
        const re = ipc().sendSync('incident-edit', book_src, incident)
        res(re)
    })
}
