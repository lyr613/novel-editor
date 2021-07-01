import { StyleSheet } from 'aphrodite'
import { StyleTheme } from 'style-/theme'
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
        left: '450px',
        top: '50px',
        fontSize: 0,
        width: 600,
        height: 600,
        backgroundColor: 'white',
        transition: 'opacity linear 0.3s',
        transitionDelay: '0.5s',
    },
    editer: {
        width: '100%',
        height: '100%',
    },
})
