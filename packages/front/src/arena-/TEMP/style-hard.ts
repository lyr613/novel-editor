import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_item_vo {
    /** 书名 */
    name: object
    /** 按钮盒子 */
    btn_box: object
    /** 一行 */
    line: object
}

/** 一本书的 */
export const style_item: style_item_vo = StyleSheet.create<style_item_vo>({
    name: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        overflow: 'hidden',
        boxSizing: 'border-box',
        width: '100%',
        lineHeight: '26px',
        height: '36px',
        padding: '5px 10px',
        fontSize: 16,
        backgroundColor: 'rgba(0,0,0,0.3)',
        color: StyleTheme.style_vars.white,
        opacity: 0.5,
    },
    btn_box: {
        display: 'none',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
    },
    line: {
        height: 40,
        backgroundColor: 'red',
    },
})

interface style_vo {
    /** 组件顶层 */
    Show: object
    /** 一本书 */
    Item: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    Show: {
        overflow: 'auto',
        fontSize: 0,
        width: '100%',
        height: '100%',
    },
    Item: {
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%',
        backgroundColor: StyleTheme.style_vars.themeDark,
        [`:hover .${css(style_item.name)}`]: {
            height: 'unset',
            opacity: 1,
        },
        [`:hover .${css(style_item.btn_box)}`]: {
            display: 'block',
        },
    },
})
