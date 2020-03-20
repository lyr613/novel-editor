import * as monaco from 'monaco-editor'
import { completion_item_provider } from './suggest'
import { auto_keyword } from './keywords'
import { hover_provider } from './hover-provider'
import { set_theme } from './theme'

export function load_monaco() {
    console.log('加载monaco编辑器设定')

    monaco.languages.register({ id: 'book' })
    auto_keyword()
    hover_provider()
    completion_item_provider()
    set_theme()
}
