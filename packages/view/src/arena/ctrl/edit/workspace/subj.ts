import { BehaviorSubject, Subject } from 'rxjs'
import { debounceTime, merge } from 'rxjs/operators'
import { node_focu$, chapter_list$, node_text_from_fs_find$, node_focu_buffer$ } from '@/source'

/** 进入禅模式 */
export const zen$ = new BehaviorSubject(false)

/** 显示缩略图 */
export const mini$ = new BehaviorSubject(false)

/** 编辑器向下滚动文本 */
export const etbottom$ = new Subject()
/** 编辑器向上滚动文本 */
export const ettop$ = new Subject()
/** 下一章 */
export const etnext$ = new Subject()

// 下一章聚焦直接切换, 下面的读取文本抖动处理 ----
etnext$.pipe().subscribe(() => {
    const node_id = node_focu$.value?.id
    const cps = chapter_list$.value
    if (!node_id) {
        return
    }
    const nodes: node[] = []

    cps.forEach((cp) => {
        cp.children.forEach((nd, i) => {
            nodes.push(nd)
        })
    })
    const fi = nodes.findIndex((v) => v.id === node_id)
    if (fi < nodes.length - 1) {
        const nextnode = nodes[fi + 1]
        node_focu$.next(nextnode)
    }
})

// ----
/** 上一章 */
export const etprev$ = new Subject()

// 上一章聚焦直接切换, 下面的读取文本抖动处理 ----
etprev$.pipe().subscribe(() => {
    const node_id = node_focu$.value?.id
    const cps = chapter_list$.value
    if (!node_id) {
        return
    }
    const nodes: node[] = []

    cps.forEach((cp) => {
        cp.children.forEach((nd, i) => {
            nodes.push(nd)
        })
    })
    const fi = nodes.findIndex((v) => v.id === node_id)
    if (fi > 0) {
        const nextnode = nodes[fi - 1]
        node_focu$.next(nextnode)
    }
})
// 抖动读取文本
etprev$.pipe(merge(etnext$), debounceTime(300)).subscribe(() => {
    const node = node_focu$.value
    if (!node) {
        return
    }
    node_text_from_fs_find$.next()

    const arr = node_focu_buffer$.value
    if (!arr.find((v) => v.id === node.id)) {
        arr.push(node)
    }
    node_focu_buffer$.next([...arr].slice(-5))
})
// ----
