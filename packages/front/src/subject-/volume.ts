import { BehaviorSubject } from 'rxjs'
import { _sub_base } from './base'
import { map, switchMap, take } from 'rxjs/operators'
import { ipc } from 'tool-/electron'

class _vo {
    bookid = ''
    /** 卷列表 */
    readonly vo_li$ = new BehaviorSubject([] as volume_vo[])
    readonly vo_use_id$ = new BehaviorSubject('')
    /** 正在使用的卷 */
    get vo_use$() {
        return this.vo_li$.pipe(
            switchMap((li) => this.vo_use_id$.pipe(map((id) => li.find((v) => (v as any).id === id)))),
            map((v) => v || null),
        )
    }
    /** 章列表 */
    readonly ca_li$ = new BehaviorSubject([] as volume_vo[])
    readonly ca_use_id$ = new BehaviorSubject('')
    /** 正在使用的章 */
    get ca_use$() {
        return this.ca_li$.pipe(
            switchMap((li) => this.ca_use_id$.pipe(map((id) => li.find((v) => (v as any).id === id)))),
            map((v) => v || null),
        )
    }
    load() {
        const volumes_re: fs_json_dto<volume_vo[]> = ipc().sendSync('chapter_load', this.bookid)
        console.log('volumes', volumes_re.data)
        if (volumes_re.b) {
            this.vo_li$.next(volumes_re.data)
        }
    }
    save(new_li: volume_vo[]) {
        const re = ipc().sendSync('chapter_save', this.bookid, new_li)
        return re
    }
}

/** 卷章 */
export const SubVolume = new _vo()
