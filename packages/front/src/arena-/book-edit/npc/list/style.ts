import { StyleSheet } from 'aphrodite'
import { themes } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    root: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    root: {
        position: 'absolute',
        zIndex: 10000,
        left: 0,
        top: 0,
        fontSize: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'red',
    },
})
