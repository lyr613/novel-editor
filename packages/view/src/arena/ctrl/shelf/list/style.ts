import { StyleSheet } from 'aphrodite'

interface style {
    /** 组件顶层 */
    root: object
    one: object
    txtline: object
    /** 封面 */
    img: object
    /** 书名和路径行悬浮高亮 */
    hover_highlight: object
}

export const style: style = StyleSheet.create<style>({
    root: {
        fontSize: 0,
        overflow: 'hidden',
    },
    one: {
        position: 'relative',
    },
    txtline: {
        fontSize: '16px',
        lineHeight: '36px',
    },
    img: {
        // backgroundColor:
    },
    hover_highlight: {
        ':hover': {
            color: 'var(--CLRl1)',
        },
    },
})
