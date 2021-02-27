import { StyleSheet } from 'aphrodite'
import { themes } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    root: object
    Item: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        boxSizing: 'border-box',
        padding: '0 0 20px 20px',
        position: 'absolute',
        zIndex: 10000,
        left: 0,
        top: 0,
        fontSize: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: themes.style_vars.themeLight,
    },
    Item: {
        margin: '20px 20px 0 0',
        minWidth: 240,
        maxWidth: 300,
        flexGrow: 1,
        flexShrink: 1,
        height: 400,
        backgroundColor: 'red',
    },
})
