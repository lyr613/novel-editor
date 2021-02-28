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
        height: 'aspect-ratio(9/16)',
        'aspect-ratio': '3 / 4',
    },
})
