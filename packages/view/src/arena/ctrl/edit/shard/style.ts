import { StyleSheet } from 'aphrodite'

interface style {
    /** 组件顶层 */
    root: object
}

export const style: style = StyleSheet.create<style>({
    root: {
        fontSize: 0,
        whiteSpace: 'nowrap',
        lineHeight: '30px',
    },
})
