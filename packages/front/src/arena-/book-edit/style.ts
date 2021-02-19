import { StyleSheet } from 'aphrodite'
import { themes } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    book_edit: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    book_edit: {
        position: 'relative',
        overflow: 'hidden',
        fontSize: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: themes.style_vars.themeLight,
    },
})
