class _s {
    parse(name: string) {
        name = name.trim()
        let name_show = name
        let sort = Number.MAX_SAFE_INTEGER
        const reg = /^-?[1-9][0-9]*#/
        if (reg.test(name)) {
            const ns = name.split('#')[0]
            sort = parseInt(ns, 10)
            name_show = name.replace(reg, '')
        }
        return {
            sort,
            name_show,
        }
    }
    /** 传入可排序列表 */
    sort<T>(li: (sortable & T)[]) {
        li.forEach((it: sortable) => {
            const p = this.parse(it.name)
            it.name_show = p.name_show
            it.sort = p.sort
        })
        li.sort((a, b) => a.sort - b.sort)
    }
}

/** 通过命名排序的列表
 * 103#火球术
 */
export const UtilSortName = new _s()
