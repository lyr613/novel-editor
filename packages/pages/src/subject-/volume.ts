import { BehaviorSubject } from 'rxjs'
import { _sub_base } from './base'
import { debounceTime, map, switchMap, take } from 'rxjs/operators'
import { ipc } from 'tool-/electron'
import { ToolTranData } from 'tool-/tran-data'

class _vo extends _sub_base<volume_vo> {
    /** 图方便这里存一下, 应该用SubBook.use_id */
    bookid = ''
    /** 章列表 */
    readonly chapter_li$ = this.li$.pipe(
        map((li) => {
            const re = ToolTranData.flat_children<volume_vo, chapter_vo>(li)
            // console.log('ddddd', re)
            return re
        }),
    )
    readonly chapter_use_id$ = new BehaviorSubject('')
    /** 正在使用的章 */
    get chapter_use$() {
        return this.chapter_li$.pipe(
            switchMap((li) => this.chapter_use_id$.pipe(map((id) => li.find((v) => (v as any).id === id)))),
            map((v) => v || null),
        )
    }
    /** 选中章的文本, monaco编辑器用 */
    readonly chapter_use_txt$ = this.chapter_use_id$.pipe(
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
        const m = ToolTranData.li2map(this.chaper_li)
        return m
    }
    get chaper_li() {
        const vols = this.li$.value
        const re = ToolTranData.flat_children(vols)
        return re as chapter_vo[]
    }
    /** chaper.id: index */
    get chaper_index_map() {
        const vols = this.li$.value
        const m = new Map<string, number>()
        let i = 0
        vols.forEach((vol) => {
            vol.children.forEach((chap) => {
                m.set(chap.id, i)
                i++
            })
        })
        return m
    }
}

/** 卷章 */
export const SubVolume = new _vo()
