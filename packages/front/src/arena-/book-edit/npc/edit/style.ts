import { StyleSheet } from 'aphrodite'
import { themes } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    Edit: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    Edit: {
        display: 'flex',
        position: 'relative',
        zIndex: 1000,
        fontSize: 0,
        width: '100%',
        height: '100%',
        backgroundColor: themes.style_vars.themeLight,
        // backgroundColor: 'red',
    },
})
