import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    SelList: object
    Item: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    SelList: {
        overflow: 'auto',
        fontSize: 0,
        borderRight: `2px solid ${StyleTheme.style_vars.themeTertiary}`,
        width: 260,
        height: '100%',
        backgroundColor: StyleTheme.style_vars.themeLight,
    },
    Item: {
        height: 40,
        lineHeight: '40px',
        padding: '0 10px',
        fontSize: 16,
        backgroundColor: StyleTheme.style_vars.themeTertiary,
        transition: 'all linear 0.3s',
        cursor: 'pointer',

        ':hover': {
            backgroundColor: StyleTheme.style_vars.themeSecondary,
            paddingLeft: 30,
        },
    },
})
