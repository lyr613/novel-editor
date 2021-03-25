import { BehaviorSubject } from 'rxjs'

type show_t = 'icon' | 'show' | 'edit'

class _t {
    show_type$ = new BehaviorSubject('icon' as show_t)
}

/** 线索 */
export const BookEditThreads = new _t()
