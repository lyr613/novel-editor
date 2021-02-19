import { StyleSheet } from 'aphrodite'
import { themes } from 'style-/theme'
import { css } from 'aphrodite/no-important'

interface style_vo {
    /** 组件顶层 */
    monaco: object
    editer: object
}
/** 样式 */
export const style: style_vo = StyleSheet.create<style_vo>({
    monaco: {
        position: 'absolute',
        left: '50px',
        top: '50px',
        fontSize: 0,
        overflow: 'hidden',
        width: '50%',
        height: '50%',
        backgroundColor: 'white',
    },
    editer: {
        overflow: 'hidden',
        width: '100%',
        height: '100%',
    },
})
