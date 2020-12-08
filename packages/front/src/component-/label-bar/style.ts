import { StyleSheet } from 'aphrodite'
import { themes } from 'style-/theme'

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
        backgroundColor: themes.style_vars.themeDarker,
    },
    LabelItem: {
        height: 30,
        lineHeight: '30px',
        padding: ' 0 36px',
        fontSize: 14,
        color: themes.style_vars.themeLight,
        borderRight: '1px solid ' + themes.style_vars.themeDarker,
        backgroundColor: themes.style_vars.themeDarkAlt,
        cursor: 'pointer',
        userSelect: 'none',
        ':hover': {
            color: themes.style_vars.white,
        },
    },
    LabelItemUse: {
        backgroundColor: themes.style_vars.themeDark,
        color: themes.style_vars.white,
    },
})
