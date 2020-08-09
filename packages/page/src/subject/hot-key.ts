import { fromEvent, Observable } from 'rxjs'
import { map, filter } from 'rxjs/operators'
import { ipc } from '@/util/electron-help'

/** 等待退出, 2秒内连续按alt q */
let wait_quit = false

interface key {
    code: number
    alt: boolean
    ctrl: boolean
    shift: boolean
}
/** 监听键盘按键 */
export const key$: Observable<key> = fromEvent(window, 'keydown').pipe(
    map((ee) => {
        const e = ee as KeyboardEvent
        // 不可阻止, 无法打英文了
        // e.preventDefault()
        return {
            code: e.keyCode,
            alt: e.altKey || e.metaKey,
            ctrl: e.ctrlKey,
            shift: e.shiftKey,
        }
    }),
    filter((v) => {
        // 过滤单独按的ctrl, alt, shift
        const fis = [16, 17, 18, 91, 93]
        return !fis.includes(v.code)
    }),
)

export function hand_hot_key(e: key) {
    // alt + r 重载
    if (e.code === 82 && e.alt) {
        ipc().send('key-reload')
    }
    // alt + f 全屏
    if (e.code === 70 && e.alt) {
        ipc().send('key-full-screen', null)
    }
    // alt + q 退出
    if (e.code === 81 && e.alt) {
        if (wait_quit) {
            ipc().send('key-quit')
        } else {
            wait_quit = true
            setTimeout(() => {
                wait_quit = false
            }, 2000)
        }
    }
    // alt + i 控制台
    if (e.code === 73 && e.alt) {
        ipc().send('key-devtool')
    }
    // console.log(e)
}
