import { StyleSheet } from 'aphrodite'

interface style {
    /** 组件顶层 */
    root: object
    /** 容器 */
    container: object
    head: object
    title: object
    close: object
}

export const style: style = StyleSheet.create<style>({
    root: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        fontSize: 0,
    },
    container: {
        userSelect: 'none',
        padding: '20px',
        backgroundColor: 'white',
        boxShadow: '0 0 10px gray',
    },
    head: {
        height: '24px',
    },
    title: {
        fontWeight: 700,
        lineHeight: '24px',
    },
    close: {},
})
