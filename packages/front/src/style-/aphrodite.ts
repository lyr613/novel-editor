import { StyleSheet as ss } from 'aphrodite'

const ex = ss.extend([
    {
        selectorHandler(selector, _, call) {
            // console.log(selector, _)
            if (selector[0] !== '&') {
                return null
            }
            const sel2 = selector.replace(/&\s*/, '')
            return call(sel2)
        },
    },
])

export const css = ex.css
export const StyleSheet = ex.StyleSheet

export function child(sty: object) {
    return `& ${css(sty)}`
}

export function nthchild(cls: string) {
    return `:nth-of-type(1n) ${cls}`
}
