import { Subject } from 'rxjs'
import { router1, router1_vo, router2_option, router2_shelf } from './define'

class _Rt {
    /**
     * 使用 make 构造标准的路由, 然后推入此subject
     */
    readonly pusher$ = new Subject<string>()
    /** 构造标准路由
     * 2级路由参照旁边的define.ts
     * 如果有路由查询, 以?开头写为最后一个参数
     */
    make(rt1: router1_vo, ...rests: string[]) {
        const param = rests.find((v) => /^\?/.test(v)) || ''
        const rest = rests.filter((v) => !/^\?/.test(v))
        const rt = [rt1, ...rest]
            .filter(Boolean)
            .map((s) => s.replace(/[/\\]/g, ''))
            .map((s) => '/' + s)
            .join('')

        const re = rt + param
        return re
    }
    /** make 和 pusher$ 二合一 */
    next(rt1: router1_vo, ...rests: string[]) {
        const next = this.make(rt1, ...rests)
        this.pusher$.next(next)
    }
    /** 1级路由 */
    l1 = router1()
    l2shelf = router2_shelf()
    l2option = router2_option()
}

/** 路由 */
export const Rt = new _Rt()
