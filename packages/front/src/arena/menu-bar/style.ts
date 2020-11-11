import { StyleSheet } from 'aphrodite'
import { THEMECOLOR } from 'style/global'

interface style_vo {
    /** 组件顶层 */
    MenuBar: object
    btn: object
    MenuItem: object
    MenuItemUse: object
    MenuExtend: object
    MenuExtendItem: object
}

export const style: style_vo = StyleSheet.create<style_vo>({
    MenuBar: {
        display: 'flex',
        width: '100%',
        height: 30,
        fontSize: 0,
        backgroundColor: THEMECOLOR.word.l1,
        userSelect: 'none',
    },
    btn: {
        height: 30,
        fontSize: 14,
        color: 'white',
        padding: '0 10px',
        lineHeight: '30px',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: THEMECOLOR.word.l3,
        },
    },
    MenuItem: {
        position: 'relative',
        height: 30,
        fontSize: 14,
        color: '#dddddd',
        padding: '0 10px',
        lineHeight: '30px',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: THEMECOLOR.word.l3,
        },
    },
    MenuItemUse: {
        color: 'white',
        backgroundColor: THEMECOLOR.word.l3,
    },
    MenuExtend: {
        position: 'absolute',
        left: 0,
        top: 30,
        boxShadow: `0 0 5px ${THEMECOLOR.word.l1}`,
    },
    MenuExtendItem: {
        minWidth: 160,
        height: 30,
        padding: '0 20px',
        lineHeight: '30px',

        backgroundColor: THEMECOLOR.word.l1,
        ':hover': {
            backgroundColor: THEMECOLOR.word.l5,
        },
    },
})
