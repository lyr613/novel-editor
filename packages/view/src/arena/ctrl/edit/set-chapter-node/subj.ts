import { BehaviorSubject, of } from 'rxjs'
import { switchMap, map, debounceTime } from 'rxjs/operators'
import { chapter_li$ } from '@/source/chapter-node'

// 章下标, 节下标
export const sel_node1$ = new BehaviorSubject<null | number[]>(null)
// 如果按shift点击的时候是同一个
export const sel_node2$ = new BehaviorSubject<null | number[]>(null)

export const sel_li$ = sel_node1$.pipe(
    switchMap((nd1) =>
        !nd1
            ? of([])
            : sel_node2$.pipe(
                  switchMap((nd2) =>
                      !nd2
                          ? of([])
                          : chapter_li$.pipe(
                                map((cps) => {
                                    let [st, ed] = [nd1, nd2]
                                    if (st[0] > ed[0] || (st[0] === ed[0] && st[1] > ed[1])) {
                                        ;[st, ed] = [ed, st]
                                    }
                                    // console.log(st, ed)

                                    const re: node[] = []
                                    let flag = false
                                    fff: for (let y = 0; y < cps.length; y++) {
                                        const cp = cps[y]
                                        for (let x = 0; x < cp.children.length; x++) {
                                            const nd = cp.children[x]
                                            if (y >= st[0] && x >= st[1]) {
                                                flag = true
                                            }
                                            if (flag) {
                                                re.push(nd)
                                            }
                                            if (y >= ed[0] && x >= ed[1]) {
                                                break fff
                                            }
                                        }
                                    }
                                    // console.log(re)
                                    return re
                                }),
                            ),
                  ),
              ),
    ),
)

export const sel_id_map$ = sel_li$.pipe(
    map((li) => {
        const m = new Map<string, boolean>()
        li.forEach((nd) => {
            m.set(nd.id, true)
        })
        return m
    }),
)
