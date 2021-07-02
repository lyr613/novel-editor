import { BehaviorSubject, Subject } from 'rxjs'

class _s {
    /** 当前编辑器显示的文字 */
    readonly cur_editer_txt$ = new BehaviorSubject('')
    /** 从外部改变编辑窗口文字 */
    readonly cur_editer_txt_updater$ = new Subject<string>()
    entry_show$ = new BehaviorSubject(
        '' as
            | ''
            | 'volume-set'
            | 'npc-set'
            | 'npc-view'
            | 'npc-link'
            | 'cube-set'
            | 'threads-set'
            | 'recent-view'
            | 'editer-size',
    )
    /** 显示章节列表 */
    entry_hold_volume$ = new BehaviorSubject(false)
    /** 显示最近章节列表 */
    entry_hold_recent_volume$ = new BehaviorSubject(false)
}

export const SubBookEdit = new _s()
