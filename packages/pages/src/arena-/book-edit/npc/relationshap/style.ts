import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    Relationshap: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    Relationshap: {
        position: 'absolute',
        zIndex: 1000,
        left: 0,
        top: 0,
        fontSize: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: StyleTheme.style_vars.themeLight,
    },
})
