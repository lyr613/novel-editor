import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'

interface style_vo {
    LabelBar: object
    LabelItem: object
    LabelItemUse: object
}

export const style: style_vo = StyleSheet.create<style_vo>({
    LabelBar: {
        display: 'flex',
        width: '100%',
        height: 30,
        // border: '1px solid ' + THEMECOLOR.word.l2,
        backgroundColor: StyleTheme.style_vars.themeDarker,
    },
    LabelItem: {
        height: 30,
        lineHeight: '30px',
        padding: ' 0 36px',
        fontSize: 14,
        color: StyleTheme.style_vars.themeLight,
        borderRight: '1px solid ' + StyleTheme.style_vars.themeDarker,
        backgroundColor: StyleTheme.style_vars.themeDarkAlt,
        cursor: 'pointer',
        userSelect: 'none',
        ':hover': {
            color: StyleTheme.style_vars.white,
        },
    },
    LabelItemUse: {
        backgroundColor: StyleTheme.style_vars.themeDark,
        color: StyleTheme.style_vars.white,
    },
})
