import { npc_li$ } from '@/source/npc'
import { BehaviorSubject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

/** 通过名字过滤npc列表 */
export const npc_filter_name$ = new BehaviorSubject('')

/** 已过滤的npc列表 */
export const npc_did_filter_li$ = npc_li$.pipe(
    switchMap((li) =>
        npc_filter_name$.pipe(
            map((name) => {
                if (!name) {
                    return li
                }
                return li.filter((v) => v.base.name.match(name))
            }),
        ),
    ),
)
