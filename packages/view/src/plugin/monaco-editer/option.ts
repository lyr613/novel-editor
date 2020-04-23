import * as monaco from 'monaco-editor'

export function default_editer_option(): monaco.editor.IStandaloneEditorConstructionOptions {
    const opt: monaco.editor.IStandaloneEditorConstructionOptions = {
        value: '',
        language: 'book',
        lineNumbers: 'off',
        theme: 'word',
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
        contextmenu: false,
        tabSize: 4,
    }
    return opt
}
