import { BehaviorSubject } from 'rxjs'
import * as monaco from 'monaco-editor'

/**
 * 编辑器
 */
export const editer$ = new BehaviorSubject<null | monaco.editor.IStandaloneCodeEditor>(null)

/** 搜索出的敏感词 */
export const sensitive_searched_list$ = new BehaviorSubject<monaco.editor.FindMatch[]>([])
