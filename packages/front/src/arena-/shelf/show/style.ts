import { StyleSheet } from 'aphrodite'
import { themes } from 'style-/theme'
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
        color: themes.style_vars.white,
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
        display: 'flex',
        boxSizing: 'border-box',
        height: 40,
        paddingLeft: 20,
        alignItems: 'center',
        fontSize: 14,
        backgroundColor: themes.style_vars.themeDarker,
        color: themes.style_vars.white,
        userSelect: 'none',
        cursor: 'pointer',
        transition: 'all linear 0.3s',
        borderBottom: '1px solid #00000055',
        ':hover': {
            paddingLeft: 40,
        },
    },
})

interface style_vo {
    /** 组件顶层 */
    Show: object
    /** 一本书 */
    Item: object
    JumpNew: object
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
        display: 'inline-block',
        verticalAlign: 'top',
        position: 'relative',
        margin: '0 0 20px 20px',
        boxSizing: 'border-box',
        'aspect-ratio': '3 / 4',
        backgroundColor: themes.style_vars.themeDark,
        [`:hover .${css(style_item.name)}`]: {
            height: 'unset',
            opacity: 1,
        },
        [`:hover .${css(style_item.btn_box)}`]: {
            display: 'block',
        },
    },
    JumpNew: {
        display: 'flex',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: themes.style_vars.themeDark,
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: themes.style_vars.neutralLight,

        fontSize: 40,
        opacity: 0.31,
        ':hover': {
            opacity: 1,
        },
    },
})
