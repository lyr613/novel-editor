import { StyleSheet } from 'aphrodite'

interface global_style_vo {
    /** 弹性盒子 */
    flex: object
    /** flex && 竖向居中(如果没设置方向)  */
    flhc: object
    /** flex && 横向居中(如果没设置方向)  */
    flwc: object
    /** flex && 横向分散(如果没设置方向)  */
    flsb: object
    /** 依靠绝对定位居中, 需要父元素设置position */
    posabcenter: object
    /** 鼠标悬浮手型 */
    pointer: object
    /** 鼠标悬浮手型并高亮 */
    hoverfocu: object
    /** overflow */
    overhidd: object
}

/** 复用样式 */
export const global_style: global_style_vo = StyleSheet.create<global_style_vo>({
    flex: {
        display: 'flex',
    },
    flhc: {
        display: 'flex',
        alignItems: 'center',
    },
    flwc: {
        display: 'flex',
        justifyContent: 'center',
    },
    flsb: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    posabcenter: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
    },
    pointer: {
        cursor: 'pointer',
    },
    hoverfocu: {
        cursor: 'pointer',
        opacity: 0.8,
        ':hover': {
            opacity: 1,
        },
    },
    overhidd: {
        overflow: 'hidden',
    },
})

//
type sty_val = number | string
export const style_creater = {
    /** margin */
    mar(top: sty_val, right?: sty_val, bottom?: sty_val, left?: sty_val) {
        top = _default_px(top)
        if (right === undefined) {
            right = top
        }
        right = _default_px(right)
        if (bottom === undefined) {
            bottom = top
        }
        bottom = _default_px(bottom)
        if (left === undefined) {
            left = right
        }
        left = _default_px(left)
        const arr = [top, right, bottom, left]
        const key = 'mar' + arr.map(_safe_key).join('')
        const m = StyleSheet.create({
            [key]: {
                margin: arr.join(' '),
            },
        })
        return m[key]
    },
    /** padding */
    padd(top: sty_val, right?: sty_val, bottom?: sty_val, left?: sty_val) {
        top = _default_px(top)
        if (right === undefined) {
            right = top
        }
        right = _default_px(right)
        if (bottom === undefined) {
            bottom = top
        }
        bottom = _default_px(bottom)
        if (left === undefined) {
            left = right
        }
        left = _default_px(left)
        const arr = [top, right, bottom, left]
        const key = 'padd' + arr.map(_safe_key).join('')
        const m = StyleSheet.create({
            [key]: {
                padding: arr.join(' '),
            },
        })
        return m[key]
    },
    /** position */
    pos(
        position: 'absolute' | 'fixed' | 'relative',
        top?: sty_val,
        left?: sty_val,
        bottom?: sty_val,
        right?: sty_val,
        zIndex?: number,
    ) {
        top = top === undefined ? '' : _default_px(top)
        left = left === undefined ? '' : _default_px(left)
        bottom = bottom === undefined ? '' : _default_px(bottom)
        right = right === undefined ? '' : _default_px(right)
        const arr = [position, top, left, bottom, right]
        const key = 'pos' + arr.map(_safe_key).join('-')
        const m = StyleSheet.create({
            [key]: {
                position,
                top,
                left,
                bottom,
                right,
                zIndex,
            },
        })
        return m[key]
    },
    /** width, height */
    wh(width?: sty_val, height?: sty_val) {
        width = width === undefined ? '' : _default_px(width)
        height = height === undefined ? '' : _default_px(height)
        const arr = [width, height]
        const key = 'wh' + arr.map(_safe_key).join('-')
        const m = StyleSheet.create({
            [key]: {
                width,
                height,
            },
        })
        return m[key]
    },
    /** font-size */
    fts(size: sty_val) {
        size = _default_px(size)
        const key = 'fts' + _safe_key(size)
        const m = StyleSheet.create({
            [key]: {
                fontSize: size,
            },
        })
        return m[key]
    },
    /** color level 1-8 */
    clrl(level: number) {
        const key = 'clrl' + level
        const m = StyleSheet.create({
            [key]: {
                color: `var(--CLRl${level})`,
            },
        })
        return m[key]
    },
    /** bg-color level 1-8 */
    bgclrl(level: number) {
        const key = 'bgclrl' + level
        const m = StyleSheet.create({
            [key]: {
                backgroundColor: `var(--CLRl${level})`,
            },
        })
        return m[key]
    },
}

function _default_px(n: number | string) {
    if (typeof n === 'number') {
        n = n + 'px'
    }
    return n
}

/** 主题色 */
export const THEMECOLOR = {
    word: {
        l1: '#002050',
        l2: '#124078',
        l3: '#2b579a',
        l4: '#3c65a4',
        l5: '#4a78b0',
        l6: '#7da3c6',
        l7: '#a5b9d1',
        l8: '#e3ecfa',
    },
    l1() {
        // const e =
    },
}

function _safe_key(s: string) {
    return s.replace(/[^0-9a-zA-Z]/g, '')
}
