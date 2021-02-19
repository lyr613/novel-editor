import { StyleSheet } from 'aphrodite'
import { themes } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    volume: object
    ListShow: object
    SetIt: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    volume: {},
    ListShow: {
        position: 'absolute',
        left: 10,
        top: 10,

        fontSize: 0,
        width: '300px',
        height: 'calc(100vh - 20px)',
        backgroundColor: 'red',
    },
    SetIt: {
        position: 'absolute',
        zIndex: 10000,
        left: 0,
        top: 0,

        fontSize: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: themes.style_vars.themeLight,
    },
})
