import { StyleSheet } from 'aphrodite'

interface style {
    /** 组件顶层 */
    root: object
    theme: object
}

export const style: style = StyleSheet.create<style>({
    root: {
        outline: '0 solid red',
        minWidth: '80px',
        border: '1px solid gray',
        ':hover': {
            backgroundColor: '#dddddd',
        },
    },
    theme: {},
})
