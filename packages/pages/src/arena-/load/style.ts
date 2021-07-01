import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    root: object
    line: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    root: {
        fontSize: 0,
        overflow: 'hidden',
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        padding: 10,
        backgroundImage: 'linear-gradient(45deg, white 48%, gray 52%, white 52%)',
        backgroundSize: '10px 10px',
        backgroundRepeat: 'repeat',
    },
    line: {
        margin: 10,
        fontSize: 16,
    },
})
