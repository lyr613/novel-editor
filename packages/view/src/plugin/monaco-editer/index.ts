import { completion_item_provider } from './suggest'
import { auto_keyword } from './keywords'
import { hover_provider } from './hover-provider'
import { set_theme } from './theme'
import { BehaviorSubject } from 'rxjs'

export const did_monaco_load$ = new BehaviorSubject(false)

export function load_monaco() {
    const monaco = window.monaco
    console.log('加载monaco编辑器设定', monaco)

    monaco.languages.register({ id: 'book' })
    auto_keyword()
    hover_provider()
    completion_item_provider()
    set_theme()
}

;(window as any).set_did_monaco_load = () => {
    did_monaco_load$.next(true)
}
