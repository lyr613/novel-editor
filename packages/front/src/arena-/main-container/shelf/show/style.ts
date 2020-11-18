import { StyleSheet } from 'aphrodite'

interface style_vo {
    /** 组件顶层 */
    Show: object
    /** 书名 */
    ItemName: object
}

export const style: style_vo = StyleSheet.create<style_vo>({
    Show: {
        overflow: 'auto',
        fontSize: 0,
        width: '100%',
        height: '100%',
    },
    ItemName: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        boxSizing: 'border-box',
        width: '100%',
        lineHeight: '26px',
        padding: '5px 10px',
        fontSize: 16,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
})
