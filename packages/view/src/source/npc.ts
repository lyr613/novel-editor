import { BehaviorSubject, Subject } from 'rxjs'
import { map, filter, switchMap, take } from 'rxjs/operators'
import { book_use$ } from './book'
import { id32 } from '@/function/id32'
import { ipc } from '@/const'
import { shallowCopy } from '@/rx/shallow-copy'

/** npc列表 */
export const npc_list$ = new BehaviorSubject<npc[]>([])

/** 使用npc的id */
export const npc_use_id$ = new BehaviorSubject('')

/** 使用的npc */
export const npc_use$ = npc_list$.pipe(switchMap((li) => npc_use_id$.pipe(map((id) => li.find((v) => v.id === id)))))

/** 编辑的npc */
export const npc_edit$ = new BehaviorSubject(of_npc())

/** 自动编辑在用的npc, 如果没有就创造一个 */
export function edit_npc_auto() {
    npc_use$
        .pipe(
            take(1),
            shallowCopy(),
            map((v) => v ?? of_npc()),
        )
        .subscribe((npc) => {
            npc_edit$.next(npc)
        })
}

export const npc_focu$ = new BehaviorSubject<null | npc>(of_npc())

/** npc哈希表 {id: npc} */
export const npc_map$ = npc_list$.pipe(map(mk_npc_map))

/** 构造npc哈希表 */
export function mk_npc_map(npcs: npc[]) {
    const m = new Map<string, npc>()
    npcs.forEach((npc) => {
        m.set(npc.id, npc)
    })
    return m
}

/** 查找npc */
export const npc_li_finder$ = book_use$.pipe(
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
export function of_npc(): npc {
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
