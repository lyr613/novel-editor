import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface item_s {
    Container: object
    TopLine: object
    TopLineName: object
    TopLineIcon: object
    Editer: object
    EditerCommon: object
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
        backgroundColor: StyleTheme.style_vars.themeSecondary,
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
            backgroundColor: StyleTheme.style_vars.themePrimary,
        },
    },
    Editer: {
        height: 'calc(100% - 30px)',
        backgroundColor: StyleTheme.style_vars.themeLighter,
    },
    EditerCommon: {
        fontSize: 16,
        lineHeight: '26px',
        boxSizing: 'border-box',
        padding: '0 20px',
        whiteSpace: 'pre',
    },
})

interface style_vo {
    /** 组件顶层 */
    MainList: object
    Item: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    MainList: {
        fontSize: 0,
        overflow: 'auto',
        boxSizing: 'border-box',
        width: '100vw',
        // height: 'calc(100vh - 80px)',
        flexGrow: 1,
        padding: '20px 0 0 0',
        backgroundColor: StyleTheme.style_vars.themeLight,
    },
    Item: {
        display: 'inline-block',
        verticalAlign: 'top',
        margin: '0 0 20px 20px',
        boxSizing: 'border-box',
        width: 300,
        'aspect-ratio': '1 / 1',
        backgroundColor: StyleTheme.style_vars.themeLight,
        [`:hover .${css(style_item.TopLineIcon)}`]: {
            display: 'flex',
        },
    },
})
