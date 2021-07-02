import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    root: object
    Setting: object
    MoveCenter: object
    Line: object
    LineH: object
    LineW: object
    LineL: object
    LineR: object
    LineT: object
    LineB: object
    LineInH: object
    LineInW: object
    BtnBox: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    root: {
        fontSize: 0,
        width: '100%',
        height: '100%',
    },
    Setting: {
        position: 'absolute',
        zIndex: 1000,
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        // backgroundColor: StyleTheme.style_vars.themeLight,
    },
    MoveCenter: {
        position: 'absolute',
        transform: 'translate(-50%,-50%)',
        width: 40,
        height: 40,
        backgroundColor: StyleTheme.style_vars.themePrimary,
        cursor: 'pointer',
        opacity: 0.6,
        ':hover': {
            opacity: 1,
        },
    },
    Line: {
        position: 'absolute',
        overflow: 'hidden',
        cursor: 'pointer',
        ':hover p': {
            backgroundColor: StyleTheme.style_vars.themeDark,
        },
    },
    LineH: {
        top: 0,
        width: 20,
        height: '100vh',
        transform: 'translateX(-50%)',
    },
    LineW: {
        left: 0,
        height: 20,
        width: '100vw',
        transform: 'translateY(-50%)',
    },
    LineL: {
        left: 200,
    },
    LineR: {
        left: 800,
    },
    LineT: {
        top: 40,
    },
    LineB: {
        top: 500,
    },
    LineInH: {
        position: 'relative',
        zIndex: -1,
        margin: '0 auto',
        width: 2,
        height: '100vh',
        backgroundColor: StyleTheme.style_vars.themeTertiary,
    },
    LineInW: {
        position: 'relative',
        zIndex: -1,
        margin: '8px 0',
        height: 2,
        backgroundColor: StyleTheme.style_vars.themeTertiary,
    },
    BtnBox: {
        display: 'inline-block',
        position: 'relative',
        zIndex: 1500,
        padding: 10,
        ':hover': {},
        backgroundColor: StyleTheme.style_vars.themeLight,
    },
})
