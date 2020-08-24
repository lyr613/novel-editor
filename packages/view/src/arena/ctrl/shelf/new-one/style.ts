import { StyleSheet } from 'aphrodite'

interface style {
    /** 组件顶层 */
    root: object
    btn: object
}

export const style: style = StyleSheet.create<style>({
    root: {
        fontSize: 0,
    },
    btn: {},
})
