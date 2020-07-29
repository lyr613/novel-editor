import * as monaco from 'monaco-editor'
import { npc_li$ } from '@/source/npc'
import { table_list$ } from '@/source/table'
/** 悬浮提示 */
export function hover_provider() {
    monaco.languages.registerHoverProvider('book', {
        provideHover: (model, pos, token) => {
            const npcs = npc_li$.value || []
            if (!npcs.length) {
                return
            }
            /** 最后的提示语 */
            let re_suggest = ''
            /** 最后的提示语位置 */
            let re_range: any = null

            const funcs = [get_npc_extends, get_table_extends]
            // 这里遍历查找函数运行结果, 找到了就不用继续了
            for (const func of funcs) {
                const { remap, reg } = func()
                //
                if (reg) {
                    const fis = model.findMatches(reg, true, true, false, null, true)
                    const fi = fis.find((v) => v.range.containsPosition(pos))
                    if (fi?.matches) {
                        const npc_name = fi.matches[0]
                        re_suggest = remap.get(npc_name) || ''
                        re_range = fi.range
                        break
                    }
                }
            }

            if (re_range) {
                return {
                    contents: [{ value: re_suggest }],
                    range: re_range,
                }
            }

            return {
                contents: [],
            }
        },
    })
}

function get_npc_extends() {
    const npcs = npc_li$.value
    const re_map = new Map<string, string>()
    const re_arr: string[] = npcs.map((v) => v.base.name)
    npcs.forEach((npc) => {
        re_map.set(npc.base.name, npc.base.description)
        const alias = npc.uneed.alias
        if (alias?.trim()) {
            const arr = alias.split(/\s+/)
            arr.forEach((ali) => {
                re_map.set(ali, npc.base.description)
                if (!re_arr.includes(ali)) {
                    re_arr.push(ali)
                }
            })
        }
    })
    return {
        remap: re_map,
        reg: re_arr.length ? `(${re_arr.join('|')})` : null,
    }
}

function get_table_extends() {
    const arr = table_list$.value
    const re_map = new Map<string, string>()
    const re_arr: string[] = []
    arr.forEach((tb) => {
        tb.types.forEach((tp) => {
            tp.cells.forEach((cl) => {
                if (!re_map.get(cl.name)) {
                    re_arr.push(cl.name)
                    re_map.set(
                        cl.name,
                        `系统: ${tb.name} \n\n类别: ${tp.name} \n\n级别: ${cl.level} \n\n描述: ${cl.description}`,
                    )
                }
            })
        })
    })
    return {
        remap: re_map,
        reg: re_arr.length ? `(${re_arr.join('|')})` : null,
    }
}
