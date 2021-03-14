import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    Infor: object
    Base: object
    Slice: object
    /** 片段的分割线 */
    SliceSplitLine: object
    SliceSplitIndex: object
    TooltipHost: object
    /** 设置开始结束章节 */
    SetStartEndChapter: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    Infor: {
        boxSizing: 'border-box',
        fontSize: 0,
        borderRight: `2px solid ${StyleTheme.style_vars.themeTertiary}`,
        width: 600,
        height: '100%',
        padding: 20,
    },
    Base: {},
    Slice: {
        margin: '10px 0',
        padding: '20px 0',
    },
    SliceSplitLine: {
        margin: '0 auto 20px',
        width: 'calc(100% - 40px)',
        height: 1,

        backgroundColor: StyleTheme.style_vars.themeTertiary,
    },
    SliceSplitIndex: {
        marginBottom: 10,
        width: 80,
        fontSize: 14,
        color: StyleTheme.style_vars.themePrimary,
        userSelect: 'none',
        opacity: 0.6,
        ':hover': {
            opacity: 1,
        },
    },
    TooltipHost: {
        height: 14,
        fontSize: 14,
        opacity: 0.6,
        userSelect: 'none',
        ':hover': {
            opacity: 1,
        },
    },
    SetStartEndChapter: {
        padding: '0 5px',
        cursor: 'pointer',
    },
})
