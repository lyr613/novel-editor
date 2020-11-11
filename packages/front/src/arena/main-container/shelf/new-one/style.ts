import { StyleSheet } from 'aphrodite'

interface style_vo {
    /** 组件顶层 */
    root: object
}

export const style: style_vo = StyleSheet.create<style_vo>({
    root: {
        fontSize: 340,
    },
})
