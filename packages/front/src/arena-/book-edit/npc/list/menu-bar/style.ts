import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    MenuBar: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    MenuBar: {
        display: 'flex',
        boxSizing: 'border-box',
        width: '100%',
        height: 40,
        borderWidth: '0 0 1px 0',
        borderStyle: 'solid',
        borderColor: StyleTheme.style_vars.themePrimary,
        // backgroundColor: StyleTheme.style_vars.themeTertiary,
        padding: '0 5px',
        alignItems: 'center',
    },
})
