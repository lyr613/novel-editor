import * as monaco from 'monaco-editor'
import { npc_list$ } from '@/source'
import { merge } from 'rxjs/operators'
import { sensitive_check_list$ } from '@/subject/sensitive'
import { table_list$ } from '@/source/table'

/** 设置关键字 */
export function auto_keyword() {
    npc_list$.pipe(merge(table_list$), merge(sensitive_check_list$)).subscribe(() => {
        const root: any[] = [
            // [npc_reg, 'npc'],
            // [sensitive_reg, 'sensitive'],
            [/./, 'common'],
        ]
        /** 人物 */
        if (npc_list$.value.length) {
            const npc_names = get_npc_names()
            const npc_reg = new RegExp(`(${npc_names.join('|')})`)
            root.unshift([npc_reg, 'npc'])
        }

        /** 敏感词 */
        const sensitive = sensitive_check_list$.value.filter(Boolean)
        if (sensitive.length) {
            const sensitive_reg = new RegExp(`(${sensitive.join('|')})`)
            root.unshift([sensitive_reg, 'sensitive'])
        }

        // 表格关键词
        const table_reg = get_table_reg()
        if (table_reg) {
            root.unshift([table_reg, 'table'])
        }

        monaco.languages.setMonarchTokensProvider('book', {
            tokenizer: {
                root,
            },
        })
    })
    // npc_list$.subscribe(npcs => {
    // 	const names = npcs.map(n => n.base.name)
    // 	monaco.languages.setMonarchTokensProvider('book', build_keywords(names))
    // })
}

function get_npc_names() {
    const npcs = npc_list$.value
    const re = npcs.map((v) => v.base.name)
    npcs.forEach((npc) => {
        const { alias } = npc.uneed
        if (alias?.trim()) {
            const arr = alias.split(/\s+/)
            re.push(...arr)
        }
    })
    re.sort((a, b) => {
        return b.length - a.length
    })
    return re
}

/** 表格设置 */
function get_table_reg() {
    const tables = table_list$.value
    const arr: string[] = []
    tables.forEach((tb) => {
        tb.types.forEach((tp) => {
            tp.cells.forEach((cl) => {
                arr.push(cl.name)
            })
        })
    })
    arr.sort((a, b) => {
        return b.length - a.length
    })
    if (arr.length) {
        return new RegExp(`(${arr.join('|')})`)
    }
    return null
}

function build_keywords(names: string[]): monaco.languages.IMonarchLanguage {
    // 关键字
    const keyword_reg = new RegExp(`(${names.join('|')})`)
    return {
        // keywords: names,
        tokenizer: {
            root: [
                // 第二项的token和theme那边配合使用
                [
                    keyword_reg,
                    {
                        token: 'keyword',
                    },
                ],
                [/./, 'common'],
            ],
        },
    }
}
