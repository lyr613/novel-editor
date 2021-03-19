import { BehaviorSubject } from 'rxjs'
type show_type = 'icon' | 'list' | 'edit'

class _c {
    show_type$ = new BehaviorSubject('icon' as show_type)
}

export const _cube = new _c()
