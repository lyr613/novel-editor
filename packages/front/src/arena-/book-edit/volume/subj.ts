import { BehaviorSubject } from 'rxjs'

type a = 'icon' | 'tree' | 'set'
/** 卷章的展示形式 */
export const volume_show_type$ = new BehaviorSubject('icon' as a)

class _q {
    show_type$ = volume_show_type$
}

export const BookEditVolume = new _q()
