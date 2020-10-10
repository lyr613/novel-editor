import { StyleSheet } from 'aphrodite'

interface style {
    /** 组件顶层 */
    root: object
    bar: object
    timeline: object
    hline: object
}

export const style: style = StyleSheet.create<style>({
    root: {
        fontSize: 0,
    },
    bar: {
        flexShrink: 0,
        overflow: 'hidden',
        width: '100%',
        height: '90px',
    },
    timeline: {
        overflow: 'hidden',
        boxSizing: 'border-box',
        height: 40,
        padding: '0 10px',
    },
    hline: {
        cursor: 'pointer',
        ':hover': {
            backgroundColor: `var(--CLRl3)`,
        },
    },
})
