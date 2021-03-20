import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    LabelHelp: object
    TooltipHost: object
    Icon: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    LabelHelp: {
        display: 'flex',
        fontSize: 0,
        height: 28,
    },
    TooltipHost: {
        // height: 28,
    },
    Icon: {
        padding: '8px 5px 6px',
        fontSize: 14,
        cursor: 'help',
    },
})
