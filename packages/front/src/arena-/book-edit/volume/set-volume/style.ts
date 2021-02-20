import { StyleSheet } from 'aphrodite'
import { themes } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    SetIt: object
    /** 左侧 卷 */
    LeftVolume: object
    /** 中间 章 */

    MidChapter: object
    /** 右侧 设置 */
    RightBox: object
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
        backgroundColor: themes.style_vars.themeLight,
    },
    LeftVolume: {
        flexGrow: 1,
        height: '100%',
        borderRight: '1px solid ' + themes.style_vars.themeTertiary,
    },
    MidChapter: {
        flexGrow: 1,
        height: '100%',
        borderRight: '1px solid ' + themes.style_vars.themeTertiary,
    },
    RightBox: {
        width: 400,
        height: '100%',
    },
})
