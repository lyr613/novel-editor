import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'

interface style_vo {
    /** 组件顶层 */
    root: object
    /** 表单 */
    form: object
    iconSrcSel: object
}

export const style: style_vo = StyleSheet.create<style_vo>({
    root: {
        fontSize: 0,
    },
    form: {
        margin: 20,
    },
    iconSrcSel: {
        marginLeft: 10,
        padding: '0 0 0 10px',
        fontSize: 16,
        cursor: 'pointer',
        ':hover': {
            color: StyleTheme.style_vars.themePrimary,
        },
    },
})
