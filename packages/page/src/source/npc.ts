import { BehaviorSubject, Subject } from 'rxjs'
import { map, filter, switchMap, take } from 'rxjs/operators'
import { book_use$, get_cur_book_src } from './book'
import { mk_uuid } from '@/function/id32'
import { ipc } from '@/const'
import { shallowCopy } from '@/rx/shallow-copy'
import { fs_write, fs_read } from './fs-common'

/** npc列表 */
export const npc_li$ = new BehaviorSubject<npc[]>([])
/** 使用npc的id */
export const npc_use_id$ = new BehaviorSubject('')
/** 使用的npc */
export const npc_use$ = npc_li$.pipe(switchMap((li) => npc_use_id$.pipe(map((id) => li.find((v) => v.id === id)))))
/** 编辑的npc */
export const npc_edit$ = new BehaviorSubject(of_npc())
/** npc哈希表 {id: npc} */
export const npc_map$ = npc_li$.pipe(map(mk_npc_map))

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

/** 构造npc哈希表 */
export function mk_npc_map(npcs: npc[]) {
    const m = new Map<string, npc>()
    npcs.forEach((npc) => {
        m.set(npc.id, npc)
    })
    return m
}

/** 查找npc */
export const find_npc_li_$ = book_use$.pipe(
    take(1),
    map((v) => v?.src),
    map((book_src): npc[] => {
        return fs_read('json', [book_src ?? '', 'npc']) || []
    }),
)

export function find_npc_li_auto() {
    find_npc_li_$.pipe(take(1)).subscribe((li) => {
        npc_li$.next(li)
    })
}

/**
 * 新建npc
 */
export function of_npc(): npc {
    return {
        id: mk_uuid(),
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

/** 保存编辑的npc */
export function save_npc_edited() {
    const npc_edit = npc_edit$.value
    const li = [...npc_li$.value]
    const fi = li.findIndex((v) => v.id === npc_edit.id)

    if (fi === -1) {
        li.push(npc_edit)
    } else {
        li.splice(fi, 1, npc_edit)
    }
    return npc_li_save(li)
}

/** 保存npc列表 */
export function npc_li_save(npcs: npc[]) {
    const book_src = get_cur_book_src()
    if (!book_src) {
        return false
    }
    return fs_write('json', [book_src, 'npc'], npcs)
}
