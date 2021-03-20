import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    DialogSelCube: object
    Box: object
    HalfBox: object
    Hline: object
    Item: object
    ItemUse: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    DialogSelCube: {
        fontSize: 0,
        width: '100%',
        height: '100%',
    },
    Box: {
        display: 'flex',
        width: 800,
        height: 600,
        fontSize: 0,
        backgroundColor: StyleTheme.style_vars.themeLight,
    },
    HalfBox: {
        overflow: 'auto',
    },
    Item: {
        height: 36,
        lineHeight: '36px',
        borderTop: '1px solid ' + StyleTheme.style_vars.themeTertiary,
        padding: '0 10px',
        fontSize: 14,
        userSelect: 'none',
        backgroundColor: StyleTheme.style_vars.themeLight,
        cursor: 'pointer',
        transition: 'all linear 0.3s',

        ':hover': {
            backgroundColor: StyleTheme.style_vars.themeTertiary,
            paddingLeft: 30,
        },
    },
    ItemUse: {
        backgroundColor: StyleTheme.style_vars.themeTertiary,
        paddingLeft: 30,
    },
    Hline: {
        position: 'absolute',
        left: 'calc(50% - 2px)',
        top: 0,
        width: 2,
        height: '100%',
        backgroundColor: StyleTheme.style_vars.themePrimary,
    },
})
