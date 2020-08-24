import { StyleSheet } from 'aphrodite'

interface style {
    /** 组件顶层 */
    root: object
}

export const style: style = StyleSheet.create<style>({
    root: {
        minHeight: '100vh',
        fontSize: 0,
    },
})

/**
 *  min-height: 100vh;
    background-color: var(--CLRl7);
    font-size: 0;
    color: var(--CLRt2);
 */
