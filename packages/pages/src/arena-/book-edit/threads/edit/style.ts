import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    ThreadsEdit: object
    ThreadsCanvas: object
    ThreadsCanvasItem: object
    /** 编辑状态下, 后续线索 */
    ThreadsEditNextLinkItem: object
    Ctrl: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    ThreadsEdit: {
        position: 'absolute',
        zIndex: 1000,
        left: 0,
        top: 0,
        fontSize: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: StyleTheme.style_vars.themeLight,
        userSelect: 'none',
    },
    ThreadsCanvas: {
        overflowY: 'hidden',
        overflowX: 'auto',
        position: 'relative',
        boxSizing: 'border-box',
        height: '70vh',
        borderBottom: `1px solid ${StyleTheme.style_vars.themePrimary}`,
    },
    Ctrl: {
        display: 'flex',
        boxSizing: 'border-box',
        height: '30vh',
        padding: 10,
    },
    ThreadsCanvasItem: {
        position: 'absolute',
        zIndex: 20,
        border: `2px solid ${StyleTheme.style_vars.themePrimary}`,
        padding: '5px 10px',
        fontSize: 16,
        transform: 'translate(-50%,-50%)',
        cursor: 'pointer',
        backgroundColor: StyleTheme.style_vars.themeLight,
        whiteSpace: 'nowrap',
        userSelect: 'none',

        ':hover': {
            backgroundColor: StyleTheme.style_vars.themeTertiary,
        },
    },
    ThreadsEditNextLinkItem: {
        display: 'inline-block',
        margin: '0 5px 3px 0',
        padding: '3px 10px',
        fontSize: 14,
        cursor: 'pointer',
        ':hover': {
            backgroundColor: StyleTheme.style_vars.themeTertiary,
        },
    },
})
