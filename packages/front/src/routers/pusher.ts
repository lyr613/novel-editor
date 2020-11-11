import { Subject } from 'rxjs'
import { router1_vo } from './define'

/**
 * 最好不要直接使用
 */
export const router_pusher$ = new Subject<string>()

export function next_router(rt1: router1_vo, rt2?: string, rt3?: string) {
    const next = [rt1, rt2 ?? '', rt3 ?? '']
        .filter(Boolean)
        .map((s) => s.replace(/[/\\]/g, ''))
        .map((s) => '/' + s)
        .join('')
    router_pusher$.next(next)
}
