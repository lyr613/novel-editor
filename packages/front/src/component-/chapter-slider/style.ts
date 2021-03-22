import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    ChapterSlider: object
    MainSlider: object
    MainSliderSlider: object
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
        boxSizing: 'border-box',
        width: 'calc(100% - 40px)',
        height: 40,
        padding: '0 20px 0 20px',
        alignItems: 'center',
    },
    MainSliderSlider: {
        width: '100%',
    },
})
