import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    ListShow: object
    Top: object
    TopIcon: object
    VolItem: object
    VolItemName: object
    ChapItem: object
    ChapItemHigh: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    ListShow: {
        position: 'absolute',
        zIndex: 10000,
        left: 0,
        top: 0,

        fontSize: 0,
        width: '300px',
        height: '100vh',
        backgroundColor: StyleTheme.style_vars.themeTertiary,
        userSelect: 'none',
        whiteSpace: 'nowrap',
    },
    Top: {
        display: 'flex',
        borderBottom: '1px solid ' + StyleTheme.style_vars.themeSecondary,
        width: '100%',
        height: 30,
        flexDirection: 'row-reverse',
    },
    TopIcon: {
        display: 'flex',
        width: 30,
        height: 30,
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',

        ':hover': {
            backgroundColor: StyleTheme.style_vars.themeSecondary,
        },
    },
    VolItem: {
        overflow: 'hidden',
        borderTop: '1px dashed ' + StyleTheme.style_vars.themeSecondary,
        width: '100%',
        minHeight: 30,
        lineHeight: '30px',
        // cursor: 'pointer',
    },
    VolItemName: {
        boxSizing: 'border-box',
        padding: '0 15px',
        fontSize: 14,
        fontWeight: 700,
        ':hover': {
            // backgroundColor: StyleTheme.style_vars.themeSecondary,
        },
    },
    ChapItem: {
        width: '100%',
        height: 30,
        boxSizing: 'border-box',
        padding: '0 30px',
        lineHeight: '30px',
        fontSize: 14,
        cursor: 'pointer',
        ':hover': {
            backgroundColor: StyleTheme.style_vars.themeSecondary,
        },
    },
    ChapItemHigh: {
        backgroundColor: StyleTheme.style_vars.themeSecondary,
    },
})
