import { BehaviorSubject } from 'rxjs'
import { npc_li$ } from '@/source/npc'
import { switchMap, map, tap, debounceTime } from 'rxjs/operators'
import { shallowCopy } from '@/rx/shallow-copy'

/** 搜索条件 */
export const filter$ = new BehaviorSubject(create_filter())

export function create_filter() {
    return {
        active: [-40000, 40000],
        name: '',
    }
}

/** 过滤后的npc列表 */
export const npc_did_filter_li$ = npc_li$.pipe(
    switchMap((list) =>
        filter$.pipe(
            debounceTime(200),
            map((opt) =>
                list.filter((npc) => {
                    if (!npc.base.name.match(opt.name)) {
                        return false
                    }
                    return true
                }),
            ),
            shallowCopy(),
            tap((list) => {
                list.sort((a, b) => {
                    const ib = b.uneed.important || 0
                    const ia = a.uneed.important || 0
                    return ib - ia
                })
            }),
        ),
    ),
)
