import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    ChapterSlider: object
    MainSlider: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    ChapterSlider: {
        display: 'flex',
        fontSize: 0,
        width: '100%',
        height: 40,
    },
    MainSlider: {
        display: 'flex',
        width: 'calc(100% - 40px)',
        height: 40,
        alignItems: 'center',
    },
})
