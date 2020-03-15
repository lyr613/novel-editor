import { BehaviorSubject, fromEvent } from 'rxjs'
import { throttleTime, mapTo, map, debounceTime } from 'rxjs/operators'

interface t {
    /** 屏幕可用宽度 */
    W: number
    /** 屏幕可用高度 */
    H: number
    /** 竖屏还是横屏 */
    screen_type: 'pc' | 'm'
    /** 2: 1366及以下, 3: 1920及以下 */
    screen_level: number
}

/** 获得屏幕类型 */
function get_screen() {
    const [W, H] = [window.innerWidth, window.innerHeight]
    const type: 'pc' | 'm' = W > H ? 'pc' : 'm'
    const level = [0, 1000, 1361, 1921, 4000].findIndex((v) => W < v)
    return {
        type,
        level,
    }
}

/** 获取屏幕尺寸信息 */
function get_it(): t {
    const [W, H] = [window.innerWidth, window.innerHeight]
    const screen = get_screen()
    return {
        W,
        H,
        screen_type: screen.type,
        screen_level: screen.level,
    }
}

/** 屏幕尺寸信息
 * @returns W 屏幕可用宽度
 * @returns H 屏幕可用高度
 * @returns screen_level  2: 1366及以下, 3: 1920及以下
 * @returns screen_type 竖屏还是横屏
 */
export const Screen$ = new BehaviorSubject(get_it())

fromEvent(window, 'resize')
    .pipe(
        debounceTime(300),
        map(() => get_it()),
    )
    .subscribe(Screen$)
