import { createHashHistory } from 'history'
import { router_l1 } from '.'

let prev_router = '-1'

/** 下一个路由 */
export function next_router(router: router_l1, ...rest: string[]) {
    const p = createHashHistory()
    const full = '/' + router + hand_rest()

    if (full === prev_router) {
        return
    }
    p.push(full)
    prev_router = full

    function hand_rest() {
        if (!rest.length) {
            return ''
        }
        return '/' + rest.join('/')
    }
}
