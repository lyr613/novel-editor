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
    OneBook: {},
})
