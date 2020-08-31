import { StyleSheet, CSSProperties } from 'aphrodite'

interface style {
    /** 组件顶层 */
    root: object
}

export const style: style = StyleSheet.create<style>({
    root: {
        fontWeight: 700,
        lineHeight: '32px',
        cursor: 'default',
    },
})

enum preset {
    /** 禁用 */
    disable = 'disable',
    canClick = 'canClick',
}
export const preset_style: Record<preset, CSSProperties> = {
    canClick: {
        cursor: 'pointer',
        ':hover': {
            color: 'var(--CLRl1)',
        },
    },
    disable: {
        color: 'gray',
        cursor: 'default',
        ':hover': {
            color: 'gray',
        },
    },
}
