import { createTheme, loadTheme } from '@fluentui/react'

class THEME {
    constructor() {
        this.use('word')
    }
    /**
     * @deprecated
     * word 不建议外部使用
     */
    public get word() {
        return {
            palette: {
                themePrimary: '#2b579a',
                themeLighterAlt: '#f4f7fb',
                themeLighter: '#d3deef',
                themeLight: '#b0c3e0',
                themeTertiary: '#6e90c2',
                themeSecondary: '#3d66a5',
                themeDarkAlt: '#274e8a',
                themeDark: '#214274',
                themeDarker: '#183156',
                neutralLighterAlt: '#faf9f8',
                neutralLighter: '#f3f2f1',
                neutralLight: '#edebe9',
                neutralQuaternaryAlt: '#e1dfdd',
                neutralQuaternary: '#d0d0d0',
                neutralTertiaryAlt: '#c8c6c4',
                neutralTertiary: '#a19f9d',
                neutralSecondary: '#605e5c',
                neutralPrimaryAlt: '#3b3a39',
                neutralPrimary: '#323130',
                neutralDark: '#201f1e',
                black: '#000000',
                white: '#ffffff',
            },
        }
    }
    /**
     * @deprecated
     * excel 不建议外部使用
     */
    public get excel() {
        return {
            palette: {
                themePrimary: '#217346',
                themeLighterAlt: '#f2f9f5',
                themeLighter: '#cee9da',
                themeLight: '#a8d5bc',
                themeTertiary: '#62ab83',
                themeSecondary: '#318456',
                themeDarkAlt: '#1e673f',
                themeDark: '#195735',
                themeDarker: '#134027',
                neutralLighterAlt: '#faf9f8',
                neutralLighter: '#f3f2f1',
                neutralLight: '#edebe9',
                neutralQuaternaryAlt: '#e1dfdd',
                neutralQuaternary: '#d0d0d0',
                neutralTertiaryAlt: '#c8c6c4',
                neutralTertiary: '#a19f9d',
                neutralSecondary: '#605e5c',
                neutralPrimaryAlt: '#3b3a39',
                neutralPrimary: '#323130',
                neutralDark: '#201f1e',
                black: '#000000',
                white: '#ffffff',
            },
        }
    }
    /**
     * @deprecated
     * ppt 不建议外部使用
     */
    public get ppt() {
        return {
            palette: {
                themePrimary: '#b7472a',
                themeLighterAlt: '#fcf6f4',
                themeLighter: '#f4dcd6',
                themeLight: '#eabeb4',
                themeTertiary: '#d48672',
                themeSecondary: '#c0583e',
                themeDarkAlt: '#a53f26',
                themeDark: '#8c3620',
                themeDarker: '#672718',
                neutralLighterAlt: '#faf9f8',
                neutralLighter: '#f3f2f1',
                neutralLight: '#edebe9',
                neutralQuaternaryAlt: '#e1dfdd',
                neutralQuaternary: '#d0d0d0',
                neutralTertiaryAlt: '#c8c6c4',
                neutralTertiary: '#a19f9d',
                neutralSecondary: '#605e5c',
                neutralPrimaryAlt: '#3b3a39',
                neutralPrimary: '#323130',
                neutralDark: '#201f1e',
                black: '#000000',
                white: '#ffffff',
            },
        }
    }
    /** 列举主题配置 */
    public get list() {
        const names = ['word', 'excel', 'ppt']
        const arr = [this.word, this.excel, this.ppt]
        return arr.map((color, i) => ({
            name: names[i] as theme_vo,
            color: color.palette,
        }))
    }
    /** css变量 var(--some)
     * 使用此获得动态background-color
     */
    public get style_vars() {
        const o = this.word.palette
        const nobj = Object.assign({}, o)
        const ks = Object.keys(o)
        ks.forEach((k) => {
            ;(nobj as any)[k] = `var(--QV${k})`
        })
        return nobj
    }
    /**
     * 使用主题
     */
    public use(theme: theme_vo) {
        this.office_use(theme)
        this.ui_use(theme)
    }
    /** office ui 变更主题 */
    private office_use(theme: theme_vo) {
        const t = this[theme]
        const t2 = createTheme(t)
        loadTheme(t2)
    }
    /** 配色 变更主题 */
    private ui_use(theme: theme_vo) {
        const id = 'qv-theme'
        const old_dom = document.head.querySelector('#' + id)
        if (old_dom) {
            document.head.removeChild(old_dom)
        }
        const s = this[theme].palette
        const ss = Object.entries(s)
            .map((kv) => {
                const [k, v] = kv
                return `--QV${k}: ${v};`
            })
            .join('\n')
        const txt = `
        html {
            ${ss}
        }`
        const dom = document.createElement('style')
        dom.id = id
        dom.innerHTML = txt
        document.head.appendChild(dom)
    }
}

/** 主题 唯一实例 */
export const StyleTheme = new THEME()
