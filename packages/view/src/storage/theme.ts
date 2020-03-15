import { Base } from './base'

/** 所有主题 */
export const themes = ['word', 'excel', 'ppt', 'onenote', 'gray', 'dark']

class Theme extends Base<string> {
    public get key(): string {
        return 'theme'
    }
    parse(s: string | null): string {
        s = s || ''
        const thms = themes
        if (thms.includes(s)) {
            return s
        } else {
            return thms[0]
        }
    }
    stringify(v: any) {
        const thms = themes
        if (thms.includes(v)) {
            return v
        } else {
            return thms[0]
        }
    }
}

/**
 * 本地储存 - 主题
 */
export const theme_sg = new Theme()
