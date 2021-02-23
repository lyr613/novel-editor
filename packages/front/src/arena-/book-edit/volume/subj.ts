import { BehaviorSubject } from 'rxjs'
/** 切换展示设置页 */
export const can_show_set$ = new BehaviorSubject(false)

type a = 'icon' | 'tree' | 'set'
/** 卷章的展示形式 */
export const volume_show_type$ = new BehaviorSubject('icon' as a)
