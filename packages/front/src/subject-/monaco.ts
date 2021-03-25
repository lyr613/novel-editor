import * as monaco from 'monaco-editor'
import { BehaviorSubject, from } from 'rxjs'
import { map } from 'rxjs/operators'
import { StyleTheme } from 'style-/theme'
import { ToolTranData } from 'tool-/tran-data'
import { SubNpc } from './npc'
import { SubOption } from './option'

class _mo {
    readonly editer_map = new Map<string, monaco.editor.IStandaloneCodeEditor>()
    /** 已经加载完成monaco */
    readonly did_load_monaco$ = new BehaviorSubject(false)
    /** 加载monaco, 只执行一次即可 */
    load_monaco() {
        const regedid = monaco.languages.getEncodedLanguageId('book')
        if (regedid !== 0) {
            return
        }

        monaco.languages.register({
            id: 'book',
        })
        this.auto_keyword()
        this.auto_hover_provider()
        this.auto_theme()
        this.did_load_monaco$.next(true)

        // const reged2 = monaco.languages.getEncodedLanguageId('book')
        // console.log('reged', reged2)
    }
    /** 关键词 */
    auto_keyword() {
        SubNpc.li$
            .pipe(
                map((npcs) => {
                    const names = npcs.map((v) => v.name_show)
                    const npc_reg = ToolTranData.li2reg(names)
                    return npc_reg?.reg ? [[npc_reg.reg, 'npc']] : []
                }),
            )
            .subscribe((arrs) => {
                const root: any[] = [...arrs, [/./, 'common']]
                monaco.languages.setMonarchTokensProvider('book', {
                    tokenizer: {
                        root,
                    },
                })
            })
    }
    auto_hover_provider() {
        monaco.languages.registerHoverProvider('book', {
            provideHover: (model, pos, token) => {
                const funcs = [npc_hover]
                for (const fun of funcs) {
                    const { reg_obj, re_map } = fun()
                    if (!reg_obj) {
                        return
                    }

                    const fis = model.findMatches(reg_obj.string, true, true, false, null, true)
                    const fi = fis.find((v) => v.range.containsPosition(pos))
                    // console.log('fis, fix', fis, fi)

                    if (fi?.matches) {
                        const npc_name = fi.matches[0]
                        const re_suggest = re_map.get(npc_name) || ''
                        const re_range = fi.range
                        // console.log('re_suggest', re_suggest)
                        // console.log('re_range', re_range)

                        return {
                            contents: [{ value: re_suggest }],
                            range: re_range,
                        }
                    }
                }
                function npc_hover() {
                    const npc_li = SubNpc.li$.value
                    const names = npc_li.map((v) => v.name_show)
                    const reg_obj = ToolTranData.li2reg(names)
                    const re_map = new Map<string, string>()
                    npc_li.forEach((npc) => {
                        re_map.set(npc.name_show, npc.remark)
                    })
                    // console.log(re_map)

                    return { reg_obj, re_map }
                }
                return {
                    contents: [],
                }
            },
        })
    }
    auto_theme() {
        const tms = StyleTheme.list
        tms.forEach((tm) => {
            //
            monaco.editor.defineTheme(tm.name, {
                base: 'vs',
                inherit: true,
                rules: [
                    {
                        token: '',
                        background: tm.color.neutralDark,
                    },
                    {
                        token: 'common',
                        foreground: tm.color.neutralDark,
                    },
                    {
                        token: 'npc',
                        foreground: tm.color.themePrimary,
                    },
                    {
                        token: 'table',
                        foreground: tm.color.themePrimary,
                    },
                    // 敏感词
                    {
                        token: 'sensitive',
                        foreground: '#ee0000',
                        background: '#00ff00',
                        fontStyle: 'underline',
                    },
                ],
                encodedTokensColors: [],
                colors: {
                    'editor.background': tm.color.themeLighter,
                    'editorLineNumber.foreground': tm.color.themeLighter,
                    'editorMinimap.background': tm.color.themeLighter,
                    // 光标所在行
                    'editor.lineHighlightBorder': tm.color.themeLight + '22',
                    'editor.lineHighlightBackground': tm.color.themeLight + '33',
                    'editor.rangeHighlightBackground': tm.color.themeLight + '33',
                    'editor.selectionHighlightBackground': '#00000000',
                    // 选中
                    'editor.selectionBackground': tm.color.themeTertiary + '55',
                    'editorSuggestWidget.background': tm.color.themeLight,
                    'editorSuggestWidget.selectedBackground': tm.color.themeLight,
                    'editorSuggestWidget.highlightForeground': tm.color.themeLight,
                    'list.hoverBackground': tm.color.themeLight,
                    'editorSuggestWidget.foreground': tm.color.themePrimary, // 提示字颜色
                    // 光标颜色
                    'editorCursor.foreground': tm.color.neutralDark,
                },
            })
        })
    }
    /** 编辑器默认配置 */
    get default_option(): monaco.editor.IStandaloneEditorConstructionOptions {
        const app_opt = SubOption.edit$.value
        const opt: monaco.editor.IStandaloneEditorConstructionOptions = {
            value: '',
            language: 'book',
            lineNumbers: 'off',
            theme: app_opt.ui.theme,
            wordWrap: 'on',
            fontSize: 16,
            lineHeight: 26,
            fontFamily: 'siyuangooglelight',
            // 分割文本
            wordSeparators: '~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?，。？！……：”“—【】',
            // 控制编辑器是否显示缩进参考线。
            renderIndentGuides: false,
            minimap: {
                enabled: false,
            },
            // contextmenu: false,
            tabSize: 4,
        }
        return opt
    }
}

export const SubMonaco = new _mo()
