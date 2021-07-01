import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    List: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    List: {
        display: 'flex',
        position: 'absolute',
        zIndex: 10000,
        left: 0,
        top: 0,
        fontSize: 0,
        // overflow: 'auto',
        // boxSizing: 'border-box',
        width: '100vw',
        height: '100vh',
        // padding: '20px 0 0 0',
        backgroundColor: StyleTheme.style_vars.themeLight,
        flexDirection: 'column',
    },
})
