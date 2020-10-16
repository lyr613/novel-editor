import { StyleSheet } from 'aphrodite'

interface style {
    /** 组件顶层 */
    root: object
    table: object
    edit: object
}

export const style: style = StyleSheet.create<style>({
    root: {
        fontSize: 0,
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    /** 左侧表格 */
    table: {
        flexGrow: 1,
        height: '100%',
    },
    /** 右侧编辑 */
    edit: {
        width: '400px',
        height: '100%',
    },
})
