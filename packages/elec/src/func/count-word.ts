/** 累计汉字字数 */
export function count_cn_word(s: string): number {
    s = s.replace(/[^\u4e00-\u9fa5]/g, '')
    return s.length
}
