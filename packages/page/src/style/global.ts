import { StyleSheet } from 'aphrodite'

interface global_style {
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
    /** overflow: hidden */
    overhidd: object
    /** 鼠标悬浮手型 */
    cur: object
}

/** 复用样式 */
export const global_style: global_style = StyleSheet.create<global_style>({
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
    overhidd: {
        overflow: 'hidden',
    },
    cur: {
        cursor: 'pointer',
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
        const key = 'mar' + arr.join('')
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
        const key = 'padd' + arr.join('')
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
        const key = 'pos' + arr.join('-')
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
        const key = 'wh' + arr.join('-').replace(/%/g, '')
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
        const key = 'fts' + size
        const m = StyleSheet.create({
            [key]: {
                fontSize: size,
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

//
export enum Colors {
    pink = '#ff7799',
}
