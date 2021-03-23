import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    ChapterSlider: object
    MainSlider: object
    MainSliderSlider: object
    NameShow: object
    NameShowVol: object
    NameShowChap: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    ChapterSlider: {
        display: 'flex',
        position: 'relative',
        fontSize: 0,
        width: '100%',
        height: 40,
    },
    MainSlider: {
        display: 'flex',
        boxSizing: 'border-box',
        width: 'calc(100% - 40px)',
        height: 40,
        padding: '0 80px 0 10px',
        alignItems: 'center',
    },
    MainSliderSlider: {
        width: '100%',
    },
    NameShow: {
        position: 'absolute',
        right: 0,
        top: 0,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        boxSizing: 'border-box',
        width: '80px',
        height: 40,
        padding: '0 5px',
        lineHeight: '40px',
        fontSize: 14,
        textAlign: 'right',
        backgroundColor: StyleTheme.style_vars.themeLight,
        userSelect: 'none',
        whiteSpace: 'nowrap',
        ':hover': {
            width: 'unset',
            backgroundColor: StyleTheme.style_vars.themeTertiary,
            padding: '0 10px',
        },
        ':hover b': {
            fontSize: 14,
        },
    },
    NameShowVol: {
        fontSize: 0,
    },
    NameShowChap: {
        padding: '0 0 0 5px',
    },
})
