import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    ThreadsEdit: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    ThreadsEdit: {
        fontSize: 0,
        width: '100%',
        height: '100%',
    },
})
