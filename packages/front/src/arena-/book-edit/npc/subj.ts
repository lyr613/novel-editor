import { BehaviorSubject } from 'rxjs'

type show_type = 'icon' | 'list' | 'set' | 'link' | 'link-set'

class _n {
    show_type$ = new BehaviorSubject('icon' as show_type)
}

export const _npc = new _n()
