import { StyleSheet } from 'aphrodite'

interface style {
    /** 组件顶层 */
    root: object
    box: object
    /** 一个 */
    one: object
}

export const style: style = StyleSheet.create<style>({
    root: {
        fontSize: 0,
    },
    box: {
        width: '100%',
        overflow: 'hidden',
        ':hover': {
            overflowX: 'auto',
        },
    },
    one: {
        border: '1px solid var(--CLRl5)',
        borderWidth: '0 1px 0 0',
        whiteSpace: 'nowrap',
        ':hover': {
            fontSize: '12px',
        },
    },
})
