import { StyleSheet } from 'aphrodite'
import { THEMECOLOR } from 'style/global'

interface style_vo {
    /** 组件顶层 */
    root: object
}

export const style: style_vo = StyleSheet.create<style_vo>({
    root: {
        height: 30,
        fontSize: 0,
        backgroundColor: THEMECOLOR.word.l1,
    },
})
