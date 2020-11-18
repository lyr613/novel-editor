import { createTheme, loadTheme } from '@fluentui/react'

type theme_name = 'word' | 'excel' | 'ppt'
class THEME {
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
    public get list() {
        const names = ['word', 'excel', 'ppt']
        const arr = [this.word, this.excel, this.ppt]
        return arr.map((color, i) => ({
            name: names[i] as theme_name,
            color: color.palette,
        }))
    }
    constructor() {
        const t = this.word
        const t2 = createTheme(t)
        loadTheme(t2)
    }
    use(theme: theme_name) {
        const t = this[theme]
        const t2 = createTheme(t)
        loadTheme(t2)
    }
}

export const themes = new THEME()
