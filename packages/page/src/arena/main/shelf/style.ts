import { StyleSheet } from 'aphrodite'
import { STYLECOLOR } from '@/style/enum'

interface style {
    /** 组件顶层 */
    root: object
    /** 创建新想 */
    NewOne: object
    /** 书列表 */
    BookBox: object
    /** 书 */
    OneBook: object
    /** 封面 */
    cover: object
    /** 没有封面时的占位 */
    nocover: object
    /** 悬浮时高亮一下背景 */
    hoverbg: object
}

export const style: style = StyleSheet.create<style>({
    root: {
        fontSize: 0,
        color: STYLECOLOR.t8,
        backgroundColor: STYLECOLOR.l7,
        minHeight: '100vh',
    },
    NewOne: {},
    BookBox: {},
    OneBook: {
        position: 'relative',
        boxSizing: 'border-box',
        height: '160px',
        flexDirection: 'column',
        backgroundColor: STYLECOLOR.l6,
    },
    cover: {
        position: 'absolute',
        right: '5px',
        top: '5px',
        height: 'calc(100% - 10px)',
    },
    nocover: {
        position: 'absolute',
        right: '5px',
        top: '5px',
        boxSizing: 'border-box',
        width: '120px',
        height: 'calc(100% - 10px)',
        padding: '10px',
        backgroundColor: STYLECOLOR.l5,
        fontSize: '14px',
    },
    hoverbg: {
        ':hover': {
            backgroundColor: STYLECOLOR.l7,
        },
    },
})
