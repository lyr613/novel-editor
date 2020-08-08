import { StyleSheet } from 'aphrodite'

interface style {
    /** 组件顶层 */
    root: object
    /** 菜单列表盒子 */
    list: object
    /** 分割横线 */
    wline: object
    /** 一个 */
    item: object
    item_able: object
    item_disable: object
    item_use: object
}

export const style: style = StyleSheet.create<style>({
    root: {
        overflow: 'hidden',
        flexShrink: 0,
        backgroundColor: 'var(--CLRl5)',
        color: 'white',
        fontSize: 0,
    },
    list: {
        height: 'calc(100vh - 60px)',
        overflow: 'hidden',
        '&:hover': {
            overflow: 'auto',
        },
    },
    wline: {
        backgroundColor: 'rgba(255, 255, 255, 0.226)',
    },
    item: {
        width: '60px',
        height: '60px',
        lineHeight: '60px',
        textAlign: 'center',
        fontSize: '16px',
    },
    item_able: {
        color: 'var(--CLRt1)',
        transition: 'all 0.3s linear',
        '&:hover': {
            backgroundColor: 'var(--CLRl3)',
        },
    },
    item_disable: {
        color: 'gray',
    },
    item_use: {
        backgroundColor: 'var(--CLRl3)',
    },
})
