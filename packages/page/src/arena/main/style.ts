import { StyleSheet } from 'aphrodite'
import { STYLECOLOR } from '@/style/enum'

interface style {
    /** 组件顶层 */
    root: object
}

export const style: style = StyleSheet.create<style>({
    root: {
        fontSize: 0,
        overflowY: 'auto',
        flexGrow: 1,
        height: '100vh',
        backgroundColor: STYLECOLOR.l8,
    },
})
