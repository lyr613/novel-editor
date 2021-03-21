import { BehaviorSubject } from 'rxjs'
import { _sub_base } from './base'
import { debounceTime, map, switchMap, take } from 'rxjs/operators'
import { ipc } from 'tool-/electron'
import { ToolTranData } from 'tool-/tran-data'

class _vo extends _sub_base<volume_vo> {
    /** 图方便这里存一下, 应该用SubBook.use_id */
    bookid = ''
    /** 章列表 */
    readonly chap_li$ = this.li$.pipe(
        map((li) => {
            const re = ToolTranData.flat_children<volume_vo, chapter_vo>(li)
            return re
        }),
    )
    get chap_li() {
        let re: chapter_vo[] = []
        this.chap_li$.pipe(take(1)).subscribe((li) => {
            re = li
        })
        return re
    }
    readonly chap_use_id$ = new BehaviorSubject('')
    /** 正在使用的章 */
    get chap_use$() {
        return this.chap_li$.pipe(
            switchMap((li) => this.chap_use_id$.pipe(map((id) => li.find((v) => (v as any).id === id)))),
            map((v) => v || null),
        )
    }
    /** 选中章的文本, monaco编辑器用 */
    readonly ca_use_txt$ = this.chap_use_id$.pipe(
        debounceTime(100),
        map((cid) => {
            if (!cid) {
                return ''
            }
            const txt: msg_dto<string> = ipc().sendSync('chapter_load_txt', this.bookid, cid)
            return txt.data
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
        const volumes_re: msg_dto<volume_vo[]> = ipc().sendSync('chapter_load', this.bookid)
        // console.log('volumes', volumes_re.data)
        if (volumes_re.b) {
            this.li$.next(volumes_re.data)
        }
    }
    /** 保存卷章, 一般立即再调用load, 保持一致 */
    save(new_li: volume_vo[]) {
        const re = ipc().sendSync('chapter_save', this.bookid, new_li)
        return re
    }
    /**
     * id: 章
     */
    get chapter_map() {
        const m = new Map<string, chapter_vo>()
        const chaps = this.chaper_li
        chaps.forEach((chap) => {
            m.set(chap.id, chap)
        })
        return m
    }
    get chaper_li() {
        const vols = this.li$.value
        const re: chapter_vo[] = []
        vols.forEach((vol) => {
            vol.children.forEach((chap) => {
                re.push(chap)
            })
        })
        return re
    }
}

/** 卷章 */
export const SubVolume = new _vo()
