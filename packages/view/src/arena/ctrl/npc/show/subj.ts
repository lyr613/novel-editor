import { BehaviorSubject } from 'rxjs'
import { npc_li$ } from '@/source/npc'
import { switchMap, map, tap, debounceTime } from 'rxjs/operators'
import { shallowCopy } from '@/rx/shallow-copy'

export const filter$ = new BehaviorSubject(create_filter())

export function create_filter() {
    return {
        active: [-40000, 40000],
        name: '',
    }
}

export const filterd_list$ = npc_li$.pipe(
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
