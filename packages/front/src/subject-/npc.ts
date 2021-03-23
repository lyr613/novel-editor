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
     * 排序并补全切片里可能不完整的结束章节
     * @param slices 切片[]
     *
     */
    standardization_slice_chapter(slices: npc_slice_vo[]) {
        const chap_li = SubVolume.chaper_li
        if (!slices.length || !chap_li.length) {
            return slices
        }
        const m_chap_i = SubVolume.chaper_index_map
        // 先检查
        slices.forEach((sli) => {
            let si = m_chap_i.get(sli.start_chapter)
            const ei = m_chap_i.get(sli.end_chapter)
            if (si === undefined) {
                sli.start_chapter = chap_li[0].id
                si = 0
            }
            if (ei === undefined) {
                sli.end_chapter = ''
            } else {
                // 结束必须不早于开始
                if (ei < si) {
                    sli.end_chapter = sli.start_chapter
                }
            }
        })
        // 排序
        const slices2 = slices.map((sli) => {
            // 这里其实肯定有, 前面检查设置了
            const sort = m_chap_i.get(sli.start_chapter) ?? Number.MAX_SAFE_INTEGER
            return {
                sort,
                slice: sli,
            }
        })
        slices2.sort((a, b) => a.sort - b.sort)
        // 填充结束章
        const slices3 = slices2.map((v) => v.slice)
        let x = slices3.length - 1
        if (!slices3[x].end_chapter) {
            // 这里可能没有章节
            slices3[x].end_chapter = chap_li.slice(-1)[0]?.id ?? ''
        }
        x--
        while (x >= 0) {
            if (!slices3[x].end_chapter) {
                slices3[x].end_chapter = slices3[x + 1].start_chapter
            }
            x--
        }
        return slices3
    }
    /** 复制一个切片 */
    copy_slice(source: npc_slice_vo) {
        const t = JSON.stringify(source)
        const r = JSON.parse(t) as npc_slice_vo
        return r
    }
}

export const SubNpc = new _n()
