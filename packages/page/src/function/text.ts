/** 让多段文字更好的展示 */
export function show_format(s?: string) {
    if (!s) {
        return ''
    }
    return s.replace(/\s*\n+\s*/g, '\n    ').replace(/^\s*/, '    ')
}
