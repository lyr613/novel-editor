import { BehaviorSubject } from 'rxjs'
import { _sub_base } from './base'
import { debounceTime, map, switchMap, take } from 'rxjs/operators'
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
    /** 选中章的文本, monaco编辑器用 */
    readonly ca_use_txt$ = this.ca_use_id$.pipe(
        debounceTime(100),
        map((cid) => {
            if (!cid) {
                return ''
            }
            const txt: string = ipc().sendSync('chapter_load_txt', this.bookid, cid)
            return txt
        }),
    )
    /** 暂存将要写的
     *{chap_id: txt}
     */
    private write_will_obj: any = {}
    private write_timer = setTimeout(() => {}, 0)
    /** monaco编辑器推进来cid和内容, 缓存一下写到文件 */
    will_write(cid: string, txt: string) {
        if (!cid) {
            return
        }
        this.write_will_obj[cid] = txt
        clearTimeout(this.write_timer)
        this.write_timer = setTimeout(() => {
            this.write_chap_txt()
        }, 2000)
    }
    private write_chap_txt() {
        const ks = Object.keys(this.write_will_obj)
        ks.forEach((caid) => {
            const txt = this.write_will_obj[caid]
            ipc().send('chapter_write_txt', this.bookid, caid, txt)
        })
    }
    /** 加载卷章 */
    load() {
        const volumes_re: fs_json_dto<volume_vo[]> = ipc().sendSync('chapter_load', this.bookid)
        console.log('volumes', volumes_re.data)
        if (volumes_re.b) {
            this.vo_li$.next(volumes_re.data)
        }
    }
    /** 保存卷章, 一般立即再调用load, 保持一致 */
    save(new_li: volume_vo[]) {
        const re = ipc().sendSync('chapter_save', this.bookid, new_li)
        return re
    }
}

/** 卷章 */
export const SubVolume = new _vo()
