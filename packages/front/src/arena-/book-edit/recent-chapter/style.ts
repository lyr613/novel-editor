import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    RecentChapter: object
    RecentList: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    RecentChapter: {
        fontSize: 0,
        width: '100%',
        height: '100%',
    },
    RecentList: {
        position: 'absolute',
        left: 0,
        top: 0,
        borderRight: `1px solid ${StyleTheme.style_vars.themeTertiary}`,
        width: 300,
        height: '100vh',
        backgroundColor: StyleTheme.style_vars.themeLight,
    },
})
