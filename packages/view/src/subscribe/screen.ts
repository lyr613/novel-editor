import { BehaviorSubject, fromEvent, from } from 'rxjs'
import { throttleTime, mapTo, map, debounceTime, merge } from 'rxjs/operators'

/** 获取屏幕尺寸信息 */
function get_it() {
    const [W, H] = [window.innerWidth, window.innerHeight]
    return {
        W,
        H,
    }
}

/** 屏幕尺寸信息
 * @returns W 屏幕可用宽度
 * @returns H 屏幕可用高度
 */
export const screen_wh$ = fromEvent(window, 'resize').pipe(
    debounceTime(300),

    merge(from([1])),
    map(() => get_it()),
)
