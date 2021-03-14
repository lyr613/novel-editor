import { BehaviorSubject } from 'rxjs'

type show_type = 'icon' | 'list' | 'edit' | 'link' | 'link-edit'

class _n {
    show_type$ = new BehaviorSubject('icon' as show_type)
}

export const _npc = new _n()
