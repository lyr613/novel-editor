import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    FilterRow: object
    Checkboxs: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    FilterRow: {
        fontSize: 0,
        width: '100%',
        height: 80,
    },
    Checkboxs: {
        boxSizing: 'border-box',
        height: 40,
        padding: '0 10px',
    },
})
