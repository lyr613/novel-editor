import { BehaviorSubject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { SubCube } from 'subject-/cube'

type now_sel = 'none' | 'l1' | 'l2'

/** 中间可显示的章 */
class _vs {
    /** 已选择的组 */
    seled_l1$ = new BehaviorSubject([-1, -1])
    seled_l1_n$ = this.seled_l1$.pipe(
        map((n2) => {
            return Math.abs(n2[1] - n2[0]) + 1
        }),
    )

    /** 已选择的词条 */
    seled_l2$ = new BehaviorSubject([-1, -1])
    seled_l2_n$ = this.seled_l2$.pipe(
        map((n2) => {
            return Math.abs(n2[1] - n2[0]) + 1
        }),
    )
    /** 当前选择 */
    now_sel$ = new BehaviorSubject('none' as now_sel)
    /** 中间展示的章列表 */
    show_l2s$ = this.seled_l1$.pipe(
        switchMap((n2) =>
            SubCube.li$.pipe(
                map((l1s) => {
                    const max = Math.max(...n2)
                    const min = Math.min(...n2)
                    const l1s2 = l1s.slice(min, max + 1)
                    const re: cube_item_vo[] = []
                    l1s2.forEach((vol) => {
                        re.push(...vol.children)
                    })
                    return re
                }),
            ),
        ),
    )
    /** 选中的组 */
    get sel_l1_nodes() {
        const n2 = this.seled_l1$.value
        const cube_groups = SubCube.li$.value
        const max = Math.max(...n2)
        const min = Math.min(...n2)
        const re = cube_groups.slice(min, max + 1)
        return re
    }

    reset() {
        this.seled_l1$.next([-1, -1])
        this.seled_l2$.next([-1, -1])
        this.now_sel$.next('none')
    }
    /** 新建后, 刷新视图 */
    refresh() {
        const n2 = this.seled_l1$.value
        const n22 = [...n2]
        this.seled_l1$.next(n22)
    }
}

export const _cube_set = new _vs()
