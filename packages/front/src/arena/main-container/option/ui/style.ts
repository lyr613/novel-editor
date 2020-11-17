import { StyleSheet } from 'aphrodite'

interface sty {
    /** 组件顶层 */
    root: object
    section: object
    h2: object
}

export const style: sty = StyleSheet.create<sty>({
    root: {
        fontSize: 0,
    },
    section: {
        margin: 10,
    },
    h2: {
        fontSize: 16,
    },
})
