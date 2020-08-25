import { chapter_li$ } from '../chapter-node'
import { push_node_edit_id_stack } from './stack'
import { node_use$ } from './base'
import { next_router } from '@/router/router'

/** 获取当前的节列表 */
export function get_cur_node_list() {
    const cps = chapter_li$.value
    const re: node[] = []
    cps.forEach((cp) => {
        cp.children.forEach((nd) => {
            re.push(nd)
        })
    })
    return re
}

/** 选中一个节, 并跳到编辑页开始编辑 */
export function use_node_then_edit(id: string) {
    const nodes = get_cur_node_list()
    const fi = nodes.find((v) => v.id === id)

    if (fi) {
        push_node_edit_id_stack([id])
        node_use$.next(fi)
        next_router('edit')
    }
}
