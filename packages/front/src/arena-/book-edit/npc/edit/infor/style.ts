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
    SaveOrEsc: object
    CubeTable: object
    CubeTd: object
    CubeTdLeft: object
    CubeTdRight: object
    CubeTdRightItem: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    Infor: {
        position: 'relative',
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
        height: 14,
        padding: '0 5px',
        cursor: 'pointer',
        fontSize: 14,
    },
    SaveOrEsc: {
        display: 'flex',
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: 50,
        borderTop: `1px solid ${StyleTheme.style_vars.themePrimary}`,
        backgroundColor: StyleTheme.style_vars.themeTertiary,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    CubeTable: {
        borderCollapse: 'collapse',
        width: '100%',
        userSelect: 'none',
    },
    CubeTd: {
        border: `1px solid ${StyleTheme.style_vars.themePrimary}`,
        padding: '3px 5px',
        fontSize: 14,
    },
    CubeTdLeft: {
        whiteSpace: 'nowrap',
    },
    CubeTdRight: {},
    CubeTdRightItem: {
        display: 'inline-block',
        verticalAlign: 'top',
        margin: '0px 5px',
        padding: '3px 5px',
        cursor: 'pointer',
        ':hover': {
            textDecoration: 'underline',
        },
    },
})
