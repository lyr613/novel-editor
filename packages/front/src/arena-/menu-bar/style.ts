import { StyleSheet } from 'aphrodite'
import { themes } from 'style-/theme'

interface style_vo {
    /** 组件顶层 */
    MenuBar: object
    btn: object
    MenuItem: object
    MenuItemUse: object
    MenuExtend: object
    MenuExtendItem: object
    Right: object
}

export const style: style_vo = StyleSheet.create<style_vo>({
    MenuBar: {
        display: 'flex',
        zIndex: 1000,
        boxSizing: 'border-box',
        width: '100vw',
        height: 30,
        paddingLeft: 30,
        fontSize: 0,
        backgroundColor: themes.style_vars.themeDarker,
        userSelect: 'none',
    },
    btn: {
        height: 30,
        fontSize: 14,
        color: 'white',
        padding: '0 10px',
        lineHeight: '30px',
        ':hover': {
            backgroundColor: themes.style_vars.themeDarkAlt,
        },
    },
    MenuItem: {
        position: 'relative',
        height: 30,
        fontSize: 14,
        color: '#dddddd',
        padding: '0 10px',
        lineHeight: '30px',
        ':hover': {
            backgroundColor: themes.style_vars.themeDarkAlt,
        },
    },
    MenuItemUse: {
        color: 'white',
        backgroundColor: themes.style_vars.themeDarkAlt,
    },
    MenuExtend: {
        position: 'absolute',
        left: 0,
        top: 30,
        boxShadow: `0 0 5px ${themes.style_vars.themeDarker}`,
    },
    MenuExtendItem: {
        minWidth: 160,
        height: 30,
        padding: '0 20px',
        lineHeight: '30px',

        backgroundColor: themes.style_vars.themeDarker,
        ':hover': {
            backgroundColor: themes.style_vars.themeDarkAlt,
        },
    },
    Right: {
        marginLeft: 'auto',
        width: 60,
        height: 30,
        backgroundColor: themes.style_vars.black,
    },
})
