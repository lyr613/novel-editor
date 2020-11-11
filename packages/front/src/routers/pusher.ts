import { Subject } from 'rxjs'
import { router1_vo } from './define'

/**
 * 使用 mk_router 构造标准的路由, 然后推入此subject
 */
export const router_pusher$ = new Subject<string>()

/** 构造标准路由
 * 2级路由参照旁边的define.ts
 */
export function mk_router(rt1: router1_vo, rt2?: string, rt3?: string) {
    const re = [rt1, rt2 ?? '', rt3 ?? '']
        .filter(Boolean)
        .map((s) => s.replace(/[/\\]/g, ''))
        .map((s) => '/' + s)
        .join('')
    return re
}

/** mk_router 和 router_pusher$ 二合一 */
export function next_router(rt1: router1_vo, rt2?: string, rt3?: string) {
    const next = mk_router(rt1, rt2, rt3)
    router_pusher$.next(next)
}
