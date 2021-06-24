import { BehaviorSubject } from 'rxjs'

class _s {
    /** 当前编辑器显示的文字 */
    cur_editer_txt$ = new BehaviorSubject('')
}

export const SubBookEdit = new _s()
