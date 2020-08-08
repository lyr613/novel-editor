import { StyleSheet } from 'aphrodite'

interface style {
    /** 组件顶层 */
    root: object
    /** 顶部选项 */
    Options: object
    /** 字数统计 */
    ChartCount: object
}

export const style: style = StyleSheet.create<style>({
    root: {
        fontSize: 0,
        backgroundColor: 'var(--CLRl7)',
        height: '100vh',
    },
    Options: {
        minHeight: '40px',
        maxHeight: '120px',
        borderBottom: '1px solid var(--CLRl5)',
    },
    ChartCount: {
        height: '200px',
    },
})
