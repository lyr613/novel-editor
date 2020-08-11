import * as monaco from 'monaco-editor'
import { npc_li$ } from '@/source/npc'
import { table_system_li$ } from '@/source/table'

/** 片段提示 */
export function completion_item_provider() {
    monaco.languages.registerCompletionItemProvider('book', {
        provideCompletionItems: (model, pos, context) => {
            return {
                suggestions: get_seggest(model, pos, context),
            }
        },
        /** 触发 */
        triggerCharacters: ['@', '~'],
    })
}

function get_seggest(
    model: monaco.editor.ITextModel,
    pos: monaco.Position,
    context: monaco.languages.CompletionContext,
): monaco.languages.CompletionItem[] {
    // @ 人名
    // ~ 表格里的类型
    const flag = model.getLineContent(pos.lineNumber).slice(-1)
    if (flag === '@') {
        const npcs = npc_li$.value
        const keywords = npcs.map((npc) => {
            const sg: monaco.languages.CompletionItem = {
                label: '@' + npc.base.name,
                kind: monaco.languages.CompletionItemKind.Keyword,
                insertText: npc.base.name,
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                documentation: npc.base.description,
                range: {
                    startLineNumber: pos.lineNumber,
                    startColumn: pos.column - 1,
                    endLineNumber: pos.lineNumber,
                    endColumn: pos.column,
                },
            }
            return sg
        })
        return [...keywords]
    }
    if (flag === '~') {
        const re: monaco.languages.CompletionItem[] = []
        const arr = table_system_li$.value
        arr.forEach((tb) => {
            tb.types.forEach((tp) => {
                tp.cells.forEach((cl) => {
                    re.push({
                        label: '~' + cl.name,
                        kind: monaco.languages.CompletionItemKind.Keyword,
                        insertText: cl.name,
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: `系统: ${tb.name} \n类别: ${tp.name} \n级别: ${cl.level}`,
                        range: {
                            startLineNumber: pos.lineNumber,
                            startColumn: pos.column - 1,
                            endLineNumber: pos.lineNumber,
                            endColumn: pos.column,
                        },
                    })
                })
            })
        })
        return re
    }
    return []
}
