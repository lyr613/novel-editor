import { StyleSheet } from 'aphrodite'

interface style {
    /** 组件顶层 */
    root: object
    /** 最顶部的标题 */
    toptitle: object
    /** 说明 */
    help: object
}

export const style: style = StyleSheet.create<style>({
    root: {
        fontSize: 0,
    },
    toptitle: {
        boxSizing: 'border-box',
        borderBottom: '2px solid var(--CLRl3)',
        paddingLeft: 10,
    },
    help: {
        boxSizing: 'border-box',
        padding: 10,
        fontSize: 14,
        textIndent: '2em',
    },
})
