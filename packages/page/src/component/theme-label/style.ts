import { StyleSheet } from 'aphrodite'
import { STYLECOLOR } from '@/style/enum'

interface style {
    /** 组件顶层 */
    root: object
}

export const style: style = StyleSheet.create<style>({
    root: {
        color: STYLECOLOR.t8,
        ':hover': {
            color: STYLECOLOR.l1,
        },
    },
})
