import { StyleSheet } from 'aphrodite'
import { themes } from 'style-/theme'

interface style_vo {
    /** 组件顶层 */
    MenuBar: object
    MenuItem: object
    MenuItemUse: object
    /** 展开的子菜单 */
    MenuExtend: object
    MenuExtendItem: object
    /** 右侧 */
    Right: object
    IconBox: object
    IconBoxDanger: object
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
    MenuItem: {
        position: 'relative',
        height: 30,
        fontSize: 14,
        color: themes.style_vars.neutralQuaternary,
        padding: '0 10px',
        lineHeight: '30px',
        ':hover': {
            backgroundColor: themes.style_vars.themeDarkAlt,
        },
    },
    MenuItemUse: {
        color: themes.style_vars.neutralLight,
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
        display: 'flex',
        marginLeft: 'auto',
        height: 30,
    },
    IconBox: {
        display: 'flex',
        width: 48,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        color: themes.style_vars.neutralQuaternary,
        fontSize: 12,
        ':hover': {
            backgroundColor: themes.style_vars.themeDarkAlt,
        },
    },
    IconBoxDanger: {
        ':hover': {
            backgroundColor: `rgb(212,18,35)`,
            color: themes.style_vars.white,
        },
    },
})
