import { StyleSheet } from 'aphrodite'

interface style_vo {
    /** 组件顶层 */
    Show: object
}

export const style: style_vo = StyleSheet.create<style_vo>({
    Show: {
        overflow: 'hidden',
        fontSize: 0,
    },
})
