import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    SetIt: object
    /** 左侧 卷 */
    LeftVolume: object
    /** 中间 章 */

    MidChapter: object
    /** 右侧 设置 */
    RightOption: object
    VolumeItem: object
    VolumeItemName: object
    ChapterItem: object
    ChapterItemName: object
    VolumeItemHigh: object
    /** 右侧行为块 */
    ActionBlock: object
    ActionBlockName: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    SetIt: {
        display: 'flex',
        position: 'absolute',
        zIndex: 10000,
        left: 0,
        top: 0,

        fontSize: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: StyleTheme.style_vars.themeLight,
        userSelect: 'none',
    },
    LeftVolume: {
        width: 540,
        overflowY: 'auto',
        flexShrink: 0,
        boxSizing: 'border-box',
        height: '100%',
        padding: 20,
        borderRight: '1px solid ' + StyleTheme.style_vars.themeTertiary,
        // backgroundImage: ` linear-gradient(-90deg, ${themes.style_vars.themeLight} , ${themes.style_vars.themeTertiary})`,
    },
    MidChapter: {
        overflowY: 'auto',
        boxSizing: 'border-box',
        height: '100%',
        width: 790,
        padding: 20,
        borderRight: '1px solid ' + StyleTheme.style_vars.themeTertiary,
        // backgroundImage: ` linear-gradient(-90deg, ${themes.style_vars.themeLight} , ${themes.style_vars.themeTertiary})`,
    },
    RightOption: {
        boxSizing: 'border-box',
        flexGrow: 1,
        padding: 20,
        flexShrink: 0,

        height: '100%',
    },
    VolumeItem: {
        display: 'inline-block',
        verticalAlign: 'top',
        overflow: 'hidden',
        width: 120,
        height: 160,
        fontSize: 60,
        textAlign: 'center',
        border: '1px solid #00000000',
        cursor: 'pointer',
        ':hover': {
            border: '1px solid ' + StyleTheme.style_vars.themePrimary,
        },
    },
    VolumeItemName: {
        fontSize: 14,
    },
    ChapterItem: {
        display: 'inline-block',
        verticalAlign: 'top',
        overflow: 'hidden',
        width: 120,
        height: 160,
        fontSize: 60,
        textAlign: 'center',
        border: '1px solid #00000000',
        ':hover': {
            border: '1px solid ' + StyleTheme.style_vars.themePrimary,
        },
    },
    ChapterItemName: {
        fontSize: 14,
    },
    VolumeItemHigh: {
        backgroundColor: StyleTheme.style_vars.themeTertiary,
    },
    ActionBlock: {
        marginTop: 10,
        borderTop: '1px solid ' + StyleTheme.style_vars.themePrimary,
    },
    ActionBlockName: {
        height: 24,
        lineHeight: '24px',
        fontSize: 14,
        fontWeight: 700,
    },
})
