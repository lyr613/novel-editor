import { BehaviorSubject, Subject } from 'rxjs'
import { map, filter, switchMap } from 'rxjs/operators'
import { book_focu$ } from './book'
import { npc_find_ipc } from './ipc/npc'
import { id32 } from '@/function/id32'

/** 查找npc */
export const npc_find$ = new Subject()

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

/** 查询npc */
npc_find$
    .pipe(
        map(() => {
            return book_focu$.value?.src!
        }),
        filter((src) => !!src),
        switchMap((src) => {
            return npc_find_ipc(src)
        }),
    )
    .subscribe((li: npc[]) => {
        npc_list$.next(li)
    })

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
