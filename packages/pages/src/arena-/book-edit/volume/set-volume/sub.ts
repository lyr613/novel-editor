import { BehaviorSubject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { SubVolume } from 'subject-/volume'

type now_sel = 'none' | 'chapter' | 'volume'

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
    /** 中间展示的章列表 */
    show_chapters$ = this.seled_volume$.pipe(
        switchMap((n2) =>
            SubVolume.li$.pipe(
                map((vols) => {
                    const max = Math.max(...n2)
                    const min = Math.min(...n2)
                    const vols2 = vols.slice(min, max + 1)
                    const re: chapter_vo[] = []
                    vols2.forEach((vol) => {
                        re.push(...vol.children)
                    })
                    return re
                }),
            ),
        ),
    )
    /** 选中的卷 */
    get sel_vol_nodes() {
        const n2 = this.seled_volume$.value
        const vols = SubVolume.li$.value
        const max = Math.max(...n2)
        const min = Math.min(...n2)
        const vols2 = vols.slice(min, max + 1)
        return vols2
    }

    reset() {
        this.seled_volume$.next([-1, -1])
        this.seled_chapter$.next([-1, -1])
        this.now_sel$.next('none')
    }
    /** 新建后, 刷新视图 */
    refresh() {
        const n2 = this.seled_volume$.value
        const n22 = [...n2]
        this.seled_volume$.next(n22)
    }
}

export const _volume_set = new _vs()
