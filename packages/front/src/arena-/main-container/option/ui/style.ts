import { StyleSheet, css, child, nthchild } from 'style-/aphrodite'

interface sty {
    /** 组件顶层 */
    root: object
    section: object
    h2: object
    themeItem: object
}

export const sty_mit = StyleSheet.create({
    inner: {
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        borderWidth: 8,
        borderStyle: 'solid',
    },
})

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
        cursor: 'pointer',
        fontSize: 0,
        [child(sty_mit.inner)]: {
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            borderWidth: 8,
            borderStyle: 'solid',
        },
    },
})
