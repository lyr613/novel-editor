import { ipc } from 'tool-/electron'
import { mk_uuid } from 'tool-/uuid'
import { _sub_base } from './base'
import { SubBook } from './book'
import { SubVolume } from './volume'

class _n extends _sub_base<npc_vo> {
    make(): npc_vo {
        return {
            id: mk_uuid(),
            name: '',
            remark: '',
            alias: '',
            sort: Number.MAX_SAFE_INTEGER,
            name_show: '',
            slices: [this.make_slice()],
        }
    }
    make_slice(): npc_slice_vo {
        return {
            start_chapter: '',
            end_chapter: '',
            remark: '',
            cube: [],
            relation: [],
        }
    }
    save_edit() {
        const edit = this.edit$.value
        const li = this.li$.value
        const fi = li.findIndex((v) => v.id === edit.id)
        if (fi === -1) {
            li.push(edit)
        } else {
            li[fi] = edit
        }
        this.save(li)
    }
    save(li: npc_vo[]) {
        const bid = SubBook.use_id$.value
        const re: msg_dto<boolean> = ipc().sendSync('npc_save', bid, li)
    }
    load() {
        const bid = SubBook.use_id$.value
        const re: msg_dto<npc_vo[]> = ipc().sendSync('npc_load', bid)
        if (re.b) {
            this.li$.next(re.data)
        } else {
            alert('加载角色列表失败')
        }
    }
    /**
     * 补全切片里可能不完整的结束章节
     * @param slices 切片[]
     *
     */
    standardization_slice_chapter(slices: npc_slice_vo[]) {
        const chap_li = SubVolume.chaper_li
        const m_chap_i = new Map<string, number>()
        chap_li.forEach((chap, i) => {
            m_chap_i.set(chap.id, i)
        })
        const res = slices.map((sli) => {
            const st = sli.start_chapter
            const ed = sli.end_chapter
            const re = {
                st: -1,
                ed: -1,
            }
            if (!st) {
                return re
            }
            re.st = m_chap_i.get(st) || -1
            re.ed = m_chap_i.get(ed) || -1
            return re
        })
        if (res[0].st === -1) {
            res[0].st = 0
        }
        if (res.slice(-1)[0].ed === -1) {
            res.slice(-1)[0].ed = chap_li.length - 1
        }
    }
    /** 复制一个切片 */
    copy_slice(source: npc_slice_vo) {
        const t = JSON.stringify(source)
        const r = JSON.parse(t) as npc_slice_vo
        return r
    }
}

export const SubNpc = new _n()
