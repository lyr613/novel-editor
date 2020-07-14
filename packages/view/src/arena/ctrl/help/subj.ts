import { BehaviorSubject } from 'rxjs'

export const help_li = ['关于', '操作', '事件', '表格', '云端仓库']

export const help_use$ = new BehaviorSubject(help_li[0])
