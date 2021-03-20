import { BehaviorSubject, Observable } from 'rxjs'
import { map, switchMap, take } from 'rxjs/operators'

type now_sel = 'none' | 'l1' | 'l2'

interface l1able {
    id: string
    children: any[]
}
interface l2able {
    id: string
}

/**
 * Source的需要多个实例
 */
export class SourceLevel2Select<T extends l1able, K extends l2able> {
    /** 当前选择 */
    now_sel$ = new BehaviorSubject('none' as now_sel)
    seled_l1_map$ = new BehaviorSubject(new Map<string, boolean>())
    seled_l2_map$ = new BehaviorSubject(new Map<string, boolean>())
    seled_l1_count$ = this.seled_l1_map$.pipe(map(count_true_in_map))
    seled_l2_count$ = this.seled_l2_map$.pipe(map(count_true_in_map))
    l2_can_show_li$!: Observable<K[]>
    seled_l1_li$!: Observable<T[]>
    seled_l2_li$!: Observable<K[]>
    l1_source$!: BehaviorSubject<T[]>

    /**
     * 适用两层选择
     */
    constructor(l1_source$: BehaviorSubject<T[]>) {
        this.l1_source$ = l1_source$
        this.seled_l1_li$ = l1_source$.pipe(
            switchMap((l1s) =>
                this.seled_l1_map$.pipe(
                    map((m) => {
                        return l1s.filter((v) => m.get(v.id))
                    }),
                ),
            ),
        )
        this.seled_l2_li$ = l1_source$.pipe(
            switchMap((l1s) =>
                this.seled_l2_map$.pipe(
                    map((m) => {
                        const re: K[] = []
                        l1s.forEach((l1) => {
                            l1.children.forEach((l2) => {
                                if (m.get(l2.id)) {
                                    re.push(l2)
                                }
                            })
                        })
                        return re
                    }),
                ),
            ),
        )
        this.l2_can_show_li$ = l1_source$.pipe(
            switchMap((l1s) =>
                this.seled_l1_map$.pipe(
                    map((m) => {
                        const re: K[] = []
                        l1s.forEach((v) => {
                            if (m.get(v.id)) {
                                re.push(...v.children)
                            }
                        })
                        return re
                    }),
                ),
            ),
        )
    }
    get seled_l1_li() {
        let re: T[] = []
        this.seled_l1_li$.pipe(take(1)).subscribe((li) => {
            re = li
        })
        return re
    }
    get seled_l2_li() {
        let re: K[] = []
        this.seled_l2_li$.pipe(take(1)).subscribe((li) => {
            re = li
        })
        return re
    }
    click_l1(e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) {
        this.seled_l2_map$.next(new Map())
        this.now_sel$.next('l1')
        const map$ = this.seled_l1_map$
        const li = this.l1_source$.value
        this.click_merge(e, id, map$, li)
    }
    click_l2(e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) {
        this.now_sel$.next('l2')
        const map$ = this.seled_l2_map$
        this.l2_can_show_li$.pipe(take(1)).subscribe((li) => {
            this.click_merge(e, id, map$, li)
        })
    }

    click_merge(
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        id: string,
        map$: BehaviorSubject<Map<string, boolean>>,
        li: l2able[],
    ) {
        const map = map$.value

        if (e.ctrlKey) {
            const b = map.get(id)
            map.set(id, !b)
            const nm = new Map(map)
            map$.next(nm)
            return
        }
        if (e.shiftKey) {
            // 就近选中, 不取消选择
            const seldc = count_true_in_map(map)
            if (seldc > 0) {
                // 没有选中时, 等同没按shift
                if (map.get(id)) {
                    // 已经选中这条, 不动作
                    return
                }
                // 查找左右的选中
                let [x1, x2, x3] = [-1, -1, -1]
                for (let x = 0; x < li.length; x++) {
                    const it = li[x]
                    if (it.id === id) {
                        x2 = x
                    } else {
                        if (map.get(it.id)) {
                            if (x2 === -1) {
                                x1 = x
                            } else {
                                x3 = x
                                break
                            }
                        }
                    }
                }
                // console.log([x1, x2, x3])
                // 左右都有就连接, 否则连接最近的选中
                const lr = [x1, x3]
                if (x1 === -1) {
                    lr[0] = x2
                }
                if (x3 === -1) {
                    lr[1] = x2
                }
                for (let x = lr[0]; x <= lr[1]; x++) {
                    map.set(li[x].id, true)
                }
                const mp_s2 = new Map(map)
                map$.next(mp_s2)
                return
            }
        }
        const m = new Map([[id, true]])
        map$.next(m)
    }
}

function count_true_in_map(m: Map<string, boolean>) {
    let c = 0
    m.forEach((v, k) => {
        if (v) {
            c++
        }
    })
    return c
}
