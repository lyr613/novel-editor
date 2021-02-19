import * as monaco from 'monaco-editor'
import { from } from 'rxjs'
import { themes } from 'style-/theme'
import { SubOption } from './option'

class _mo {
    editer_map = new Map<string, monaco.editor.IStandaloneCodeEditor>()
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
        this.auto_theme()

        // const reged2 = monaco.languages.getEncodedLanguageId('book')
        // console.log('reged', reged2)
    }
    auto_keyword() {
        const root: any[] = [
            // [npc_reg, 'npc'],
            // [sensitive_reg, 'sensitive'],
            [/./, 'common'],
        ]
        from([['秋无衣', '龙傲天']]).subscribe((li) => {
            const npc_reg = new RegExp(`(${li.join('|')})`)
            root.unshift([npc_reg, 'npc'])
        })

        monaco.languages.setMonarchTokensProvider('book', {
            tokenizer: {
                root,
            },
        })
    }
    auto_theme() {
        const tms = themes.list
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
