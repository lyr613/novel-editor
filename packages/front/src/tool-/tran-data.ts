/** 数据转换 */

export class ToolTranData {
    /** 从列表 T[] 得到map {id: T} */
    static li2map<T extends with_id>(li: T[]) {
        const m = new Map<string, T>()
        li.forEach((v) => {
            m.set(v.id, v)
        })
        return m
    }
    /** 2级数据, 得到子代列表 */
    static flat_children<T extends with_children<K>, K>(li: T[]) {
        const re: K[] = []
        li.forEach((v) => {
            v.children.forEach((j) => {
                re.push(j)
            })
        })
        return re
    }
    /** 构造monaco使用的reg
     * 如果数量0 返回 null
     */
    static li2reg(words: string[]) {
        const li = words.map((v) => v.trim()).filter((v) => !!v)
        const li2 = [...new Set(li)]
        if (li2.length) {
            const string = `(${li2.join('|')})`
            const reg = new RegExp(string)
            return {
                string,
                reg,
            }
        }
        return null
    }
}
