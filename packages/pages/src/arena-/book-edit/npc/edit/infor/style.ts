import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    Infor: object
    EditBox: object
    Base: object
    Slice: object
    /** 片段的分割线 */
    SliceSplitLine: object
    SliceSplitIndex: object
    TooltipHost: object
    /** 设置开始结束章节 */
    SetStartEndChapter: object
    SaveOrEsc: object
    SaveOrEscMsg: object
    CubeTable: object
    CubeTd: object
    CubeTdLeft: object
    CubeTdRight: object
    CubeTdRightItem: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    Infor: {
        display: 'flex',
        position: 'relative',
        fontSize: 0,
        borderRight: `2px solid ${StyleTheme.style_vars.themeTertiary}`,
        width: 600,
        flexGrow: 0,
        flexShrink: 0,
        height: '100%',
        paddingBottom: 0,
        flexDirection: 'column',
    },
    EditBox: {
        flexGrow: 1,
        flexShrink: 0,
        overflow: 'auto',
        boxSizing: 'border-box',
        width: '100%',
        height: 'calc(100% - 50px)',
        padding: 20,
    },
    SaveOrEsc: {
        display: 'flex',
        width: '100%',
        height: 50,
        borderTop: `1px solid ${StyleTheme.style_vars.themePrimary}`,
        backgroundColor: StyleTheme.style_vars.themeTertiary,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    SaveOrEscMsg: {
        fontSize: 14,
        lineHeight: '50px',
        paddingRight: 20,
        color: 'white',
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
        // marginBottom: 10,
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
        padding: '2px 5px 0',
        cursor: 'pointer',
        fontSize: 14,
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
