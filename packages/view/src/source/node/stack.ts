import { BehaviorSubject } from 'rxjs'
import { map, switchMap, take } from 'rxjs/operators'
import { node_map$ } from './base'

/** 编辑页最近的节导航 id */
export const node_edit_id_stack$ = new BehaviorSubject<string[]>([])

/** 编辑页最近的节导航 id */
export const node_edit_stack$ = node_edit_id_stack$.pipe(
    switchMap((ids) => node_map$.pipe(map((m) => ids.map((id) => m.get(id)!).filter((v) => !!v)))),
)

/** 向编辑页最近的节导航添加一些id */
export function push_node_edit_id_stack(ids: string[]) {
    const old = node_edit_id_stack$.value
    const mids = new Set(old)
    ids.forEach((id) => {
        mids.add(id)
    })
    const news = Array.from(mids)
    node_edit_id_stack$.next(news)
}
/** 向编辑页最近的节导航删除一些id */
export function remove_node_edit_id_stack(ids: string[]) {
    const old = node_edit_id_stack$.value
    const news = old.filter((v) => !ids.includes(v))
    node_edit_id_stack$.next(news)
}

/** 获取当前节导航列表的节 */
export function get_cur_node_stack() {
    let re: node[] = []
    node_edit_stack$.pipe(take(1)).subscribe((li) => (re = li))
    return re
}
