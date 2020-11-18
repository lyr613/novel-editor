import { from, fromEvent, merge } from 'rxjs'
import { debounceTime, map } from 'rxjs/operators'

function get_screen() {
    const [W, H] = [window.innerWidth - 20, window.innerHeight]
    return {
        W,
        H,
    }
}

/**
 * 屏幕宽高
 * @param dtime x毫秒的延迟时间, window.resize生效
 */
export function screen$(dtime: number) {
    return merge(from([1]), fromEvent(window, 'resize').pipe(debounceTime(dtime))).pipe(map(() => get_screen()))
}
