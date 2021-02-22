import { BehaviorSubject } from 'rxjs'
import { map } from 'rxjs/operators'

/** 已选择的卷 */
export const seled_volume$ = new BehaviorSubject([-1, -1])

export const seled_volume_n$ = seled_volume$.pipe(
    map((n2) => {
        return Math.abs(n2[1] - n2[0]) + 1
    }),
)
/** 已选择的章 */
export const seled_chapter$ = new BehaviorSubject([-1, -1])

export const seled_chapter_n$ = seled_chapter$.pipe(
    map((n2) => {
        return Math.abs(n2[1] - n2[0]) + 1
    }),
)

type now_sel = 'none' | 'chapter' | 'volume'
/** 当前选择 */
export const now_sel$ = new BehaviorSubject('none' as now_sel)

/** 中间可显示的章 */
class _vs {
    /** 已选择的卷 */
    seled_volume$ = new BehaviorSubject([-1, -1])
    seled_volume_n$ = this.seled_volume$.pipe(
        map((n2) => {
            return Math.abs(n2[1] - n2[0]) + 1
        }),
    )

    /** 已选择的章 */
    seled_chapter$ = new BehaviorSubject([-1, -1])
    seled_chapter_n$ = this.seled_chapter$.pipe(
        map((n2) => {
            return Math.abs(n2[1] - n2[0]) + 1
        }),
    )
    /** 当前选择 */
    now_sel$ = new BehaviorSubject('none' as now_sel)
}

export const _volume_set = new _vs()
