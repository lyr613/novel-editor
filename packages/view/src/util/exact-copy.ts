/** 精准拷贝
 *
 * 不受信任的数据源, 先生成默认值, 然后使用此方法覆盖
 */
export function exact_copy<T>(target: T, source: any): T {
    if (target === source) {
        return target
    }
    if (target === null || source === null) {
        return target
    }
    if (typeof target !== typeof source) {
        return target
    }

    switch (typeof target) {
        case 'bigint':
        case 'boolean':
        case 'number':
        case 'string':
        case 'undefined':
            return source
        default:
            break
    }
    const ttype = Object.prototype.toString.call(target)
    const stype = Object.prototype.toString.call(source)
    if (ttype !== stype) {
        return target
    }
    if (Array.isArray(target)) {
        return (target as any[]).map((t, i) => exact_copy(t, source[i])) as any
    }
    if (ttype === '[object Object]') {
        const re: any = {}
        for (const k in target) {
            if ((target as any).hasOwnProperty(k)) {
                re[k] = exact_copy(target[k], source[k])
            }
        }
        return re
    }

    throw 'cant copy'
}
