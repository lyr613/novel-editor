import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    ThreadsEdit: object
    ThreadsCanvas: object
    ThreadsCanvasItem: object
    Ctrl: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    ThreadsEdit: {
        position: 'absolute',
        left: 0,
        top: 0,
        fontSize: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: StyleTheme.style_vars.themeLight,
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
        border: `2px solid ${StyleTheme.style_vars.themePrimary}`,
        padding: '5px 10px',
        fontSize: 16,
        transform: 'translate(-50%,-50%)',
        cursor: 'pointer',
        backgroundColor: StyleTheme.style_vars.themeLight,
        whiteSpace: 'nowrap',

        ':hover': {
            backgroundColor: StyleTheme.style_vars.themeTertiary,
        },
    },
})
