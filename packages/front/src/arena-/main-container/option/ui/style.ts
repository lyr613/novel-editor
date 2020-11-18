import { StyleSheet } from 'aphrodite'

interface sty {
    /** 组件顶层 */
    root: object
    section: object
    h2: object
    themeItem: object
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
    themeItem: {
        display: 'inline-block',
        margin: '0 10px 10px 0',
        width: 60,
        height: 60,
        outline: '8px solid red',
        outlineOffset: -8,
        cursor: 'pointer',
    },
})
