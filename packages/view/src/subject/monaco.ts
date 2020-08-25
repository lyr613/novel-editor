import { BehaviorSubject, Subject } from 'rxjs'
import { default_editer_option } from '@/plugin/monaco-editer/option'
import { switchMap, map } from 'rxjs/operators'
import { editer_setting$ } from './edit-setting'
import { shallowCopy } from '@/rx/shallow-copy'
import * as monaco from 'monaco-editor'

// 一般来说, 更新此配置需要monaco调用render重新渲染

/** 编辑器配置 */
export const monaco_option$ = new BehaviorSubject(default_editer_option())

/** 使用的编辑器配置 */
export const monaco_option_use$ = monaco_option$.pipe(
    shallowCopy(),
    switchMap((opt) =>
        editer_setting$.pipe(
            map((edit) => {
                opt.fontFamily = edit.font?.family ?? 'syhei2'
                opt.fontSize = edit.font?.size ?? 16
                return opt
            }),
        ),
    ),
)

/** 传入一个位置, 编辑页的编辑器观察以跳到 */
export const monaco_position$ = new Subject<monaco.Position>()
