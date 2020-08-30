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
        fontFamily: 'syhei4',
        ':hover': {
            backgroundColor: '#dddddd',
        },
    },
    theme: {},
})

export const preset_style = {
    theme: {
        backgroundColor: `var(--CLRl4)`,
        border: `1px solid var(--CLRl3)`,
        color: 'white',
        ':hover': {
            backgroundColor: `var(--CLRl3)`,
            borderColor: `var(--CLRl2)`,
        },
    },
    disabled: {
        borderColor: '#eeeeee',
        backgroundColor: '#eeeeee',
        color: 'gray',
        cursor: 'unset',
        ':hover': {
            borderColor: '#eeeeee',
            backgroundColor: '#eeeeee',
            color: 'gray',
        },
    },
}
