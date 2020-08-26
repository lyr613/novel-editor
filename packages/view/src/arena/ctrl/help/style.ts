import { StyleSheet } from 'aphrodite'

interface style {
    /** 组件顶层 */
    root: object
    /** 一行 */
    aline: object
    link: object
    /** 导航 */
    nav: object
    nav_item: object
    nav_item_use: object
}

export const style: style = StyleSheet.create<style>({
    root: {
        fontSize: 0,
    },
    aline: {
        marginLeft: '10px',
        lineHeight: '36px',
        fontSize: '14px',
    },
    link: {
        cursor: 'pointer',
        textDecoration: 'underline',
        ':hover': {
            color: 'var(--CLRl1)',
        },
    },
    nav: {
        borderBottom: '2px solid var(--CLRl3)',
    },
    nav_item: {
        cursor: 'pointer',
        opacity: 0.5,
        ':hover': {
            opacity: 1,
        },
    },
    nav_item_use: {
        opacity: 1,
    },
})
