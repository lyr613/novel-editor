import { StyleSheet } from 'aphrodite'
import { themes } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface item_s {
    Container: object
    TopLine: object
    TopLineName: object
    TopLineIcon: object
    Editer: object
}
/** 一个npc */
export const style_item: item_s = StyleSheet.create<item_s>({
    Container: {
        // display: 'none',
        width: '100%',
        height: '100%',
    },
    TopLine: {
        display: 'flex',
        boxSizing: 'border-box',
        height: 30,
        paddingLeft: 10,
        fontSize: 16,
        alignItems: 'center',
        backgroundColor: themes.style_vars.themeSecondary,
        userSelect: 'none',
    },
    TopLineName: {
        marginRight: 'auto',
    },
    TopLineIcon: {
        display: 'none',
        height: '100%',
        aspectRatio: '1 / 1',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: themes.style_vars.themePrimary,
        },
    },
    Editer: {
        height: 'calc(100% - 30px)',
    },
})

interface style_vo {
    /** 组件顶层 */
    root: object
    Item: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    root: {
        position: 'absolute',
        zIndex: 10000,
        left: 0,
        top: 0,
        fontSize: 0,
        overflow: 'auto',
        boxSizing: 'border-box',
        width: '100vw',
        height: '100vh',
        padding: '20px 0 0 0',
        backgroundColor: themes.style_vars.themeLight,
    },
    Item: {
        display: 'inline-block',
        verticalAlign: 'top',
        margin: '0 0 20px 20px',
        boxSizing: 'border-box',
        width: 240,
        'aspect-ratio': '1 / 1',
        backgroundColor: themes.style_vars.themeTertiary,
        [`:hover .${css(style_item.TopLineIcon)}`]: {
            display: 'flex',
        },
    },
})
