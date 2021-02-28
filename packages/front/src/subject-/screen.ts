import { from, fromEvent, merge } from 'rxjs'
import { debounceTime, map } from 'rxjs/operators'
import { ToolOs } from 'tool-/os'

class _s {
    get_screen() {
        const [W, H] = [window.innerWidth, window.innerHeight]
        return {
            W,
            H,
        }
    }
    /**
     * 屏幕宽高
     * @param dtime x毫秒的延迟时间, window.resize生效
     */
    sub$(dtime: number) {
        return merge(from([1]), fromEvent(window, 'resize').pipe(debounceTime(dtime))).pipe(
            map(() => this.get_screen()),
        )
    }
    /**
     * 根据盒子宽度和最小item宽度, 得到合适的一行个数和item宽度
     * @param box_w 盒子宽度
     * @param min_item_w 最小item宽度
     * @param gap 间距, 最好20以上, 因为windows的滚动条
     */
    auto_width(box_w: number, min_item_w: number, gap: number) {
        box_w -= gap
        if (box_w < min_item_w * 2) {
            return {
                n: 1,
                w: box_w - gap,
            }
        }
        let n = ((box_w / min_item_w) | 0) - 1
        const getw = () => ((box_w - gap * n) / n) | 0
        while (getw() >= min_item_w) {
            // console.log('www', getw())
            n++
        }
        n--
        // console.log('nn', n, getw())

        return {
            n,
            w: getw(),
        }
    }
}

export const SubScreen = new _s()
