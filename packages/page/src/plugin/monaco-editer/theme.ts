import * as monaco from 'monaco-editor'
import { theme_colors } from '@/subject/theme'

export function set_theme() {
    const names = Object.keys(theme_colors)

    names.forEach((name) => {
        const colors = theme_colors[name]
        monaco.editor.defineTheme(name, {
            base: 'vs',
            inherit: true,
            rules: [
                {
                    token: '',
                    background: colors[6],
                },
                {
                    token: 'common',
                    foreground: colors[8],
                },
                {
                    token: 'npc',
                    foreground: colors[9],
                },
                {
                    token: 'table',
                    foreground: colors[9],
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
                'editor.background': colors[6],
                'editorLineNumber.foreground': colors[6],
                'editorMinimap.background': colors[6],
                // 光标所在行
                'editor.lineHighlightBorder': colors[5] + '22',
                'editor.lineHighlightBackground': colors[5] + '33',
                'editor.rangeHighlightBackground': colors[5] + '33',
                'editor.selectionHighlightBackground': '#00000000',
                // 选中
                'editor.selectionBackground': colors[3] + '55',
                'editorSuggestWidget.background': colors[5],
                'editorSuggestWidget.selectedBackground': colors[4],
                'editorSuggestWidget.highlightForeground': colors[4],
                'list.hoverBackground': colors[4],
                'editorSuggestWidget.foreground': colors[1], // 提示字颜色
                // 光标颜色
                'editorCursor.foreground': colors[1],
            },
        })
    })
}
