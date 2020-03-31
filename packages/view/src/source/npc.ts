import { BehaviorSubject, Subject } from 'rxjs'
import { map, filter, switchMap, take } from 'rxjs/operators'
import { book_focu$ } from './book'
import { id32 } from '@/function/id32'
import { ipc } from '@/const'

export const npc_list$ = new BehaviorSubject<npc[]>([])

export const npc_focu$ = new BehaviorSubject<null | npc>(create_npc())

/** {id: npc} */
export const npc_map$ = npc_list$.pipe(
    map((li) => {
        const m = new Map<string, npc>()
        li.forEach((npc) => {
            m.set(npc.id, npc)
        })
        return m
    }),
)
/** 查找npc */
export const npc_li_finder$ = book_focu$.pipe(
    take(1),
    map((v) => v?.src),
    map((book_src): npc[] => {
        if (!book_src) {
            return []
        }
        return ipc().sendSync('npc-list', book_src)
    }),
)

export function find_npc_li_auto() {
    npc_li_finder$.subscribe((li) => {
        npc_list$.next(li)
    })
}

/**
 * 新建npc
 */
export function create_npc(): npc {
    return {
        id: id32(),
        base: {
            name: '',
            gender: '0',
            active: ['0', '1', '1', '0', '1', '2'],
            description: '',
        },
        uneed: {
            life: ['1', '1', '1', '1', '1', '2'],
            links: [],
        },
    }
}
