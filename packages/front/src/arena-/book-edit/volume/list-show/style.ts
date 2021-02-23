import { StyleSheet } from 'aphrodite'
import { themes } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    ListShow: object
    Top: object
    VolItem: object
    VolItemName: object
    ChapItem: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    ListShow: {
        position: 'absolute',
        left: 0,
        top: 0,

        fontSize: 0,
        width: '300px',
        height: '100vh',
        backgroundColor: themes.style_vars.themeTertiary,
        userSelect: 'none',
        whiteSpace: 'nowrap',
    },
    Top: {
        borderBottom: '1px solid ' + themes.style_vars.themeSecondary,
        height: 30,
    },
    VolItem: {
        overflow: 'hidden',
        width: '100%',
        minHeight: 30,
        lineHeight: '30px',
    },
    VolItemName: {
        boxSizing: 'border-box',
        padding: '0 15px',
        fontSize: 14,
        ':hover': {
            backgroundColor: themes.style_vars.themeSecondary,
        },
    },
    ChapItem: {
        width: '100%',
        height: 30,
        boxSizing: 'border-box',
        padding: '0 30px',
        lineHeight: '30px',
        fontSize: 14,
        ':hover': {
            backgroundColor: themes.style_vars.themeSecondary,
        },
    },
})
