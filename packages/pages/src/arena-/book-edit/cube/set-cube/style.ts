import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    SetCube: object
    LeftGroup: object
    MidItem: object
    RightOption: object
    CubeGroupItem: object
    CubeItemItem: object
    CubeItemRemark: object
    ActionBlock: object
    ActionBlockName: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    SetCube: {
        display: 'flex',
        position: 'absolute',
        zIndex: 10000,
        left: 0,
        top: 0,

        fontSize: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: StyleTheme.style_vars.themeLight,
        userSelect: 'none',
    },
    LeftGroup: {
        position: 'relative',
        width: 540,
        overflowY: 'auto',
        flexShrink: 0,
        boxSizing: 'border-box',
        height: '100%',
        padding: 20,
        paddingTop: 60,
        borderRight: '1px solid ' + StyleTheme.style_vars.themeTertiary,
    },
    MidItem: {
        overflowY: 'auto',
        boxSizing: 'border-box',
        height: '100%',
        width: 790,
        padding: 20,
        borderRight: '1px solid ' + StyleTheme.style_vars.themeTertiary,
    },
    RightOption: {
        boxSizing: 'border-box',
        flexGrow: 1,
        padding: 20,
        flexShrink: 0,

        height: '100%',
    },
    CubeGroupItem: {},
    CubeItemItem: {
        height: 'unset',
        minHeight: '36px',
    },
    CubeItemRemark: {
        lineHeight: '24px',
        textIndent: '2em',
    },
    ActionBlock: {
        marginTop: 10,
        borderTop: '1px solid ' + StyleTheme.style_vars.themePrimary,
    },
    ActionBlockName: {
        height: 24,
        lineHeight: '24px',
        fontSize: 14,
        fontWeight: 700,
    },
})
