import { StyleSheet } from 'aphrodite'
import { STYLECOLOR } from '@/style/enum'

interface style {
    /** 组件顶层 */
    root: object
    /** 菜单列表盒子 */
    box: object
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
        flexShrink: 0,
        backgroundColor: STYLECOLOR.l5,
        color: 'white',
        fontSize: 0,
    },
    box: {
        height: 'calc(100vh - 60px)',
        overflow: 'hidden',
        ':hover': {
            overflow: 'auto',
        },
    },
    wline: {
        backgroundColor: 'rgba(255, 255, 255, 0.226)',
    },
    item: {},
    item_able: {
        color: STYLECOLOR.t1,
        transition: 'all 0.3s linear',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: STYLECOLOR.l3,
        },
    },
    item_disable: {
        color: STYLECOLOR.t3,
    },
    item_use: {
        backgroundColor: STYLECOLOR.l3,
    },
})
