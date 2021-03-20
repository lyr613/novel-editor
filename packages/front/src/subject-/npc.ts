import { ipc } from 'tool-/electron'
import { mk_uuid } from 'tool-/uuid'
import { _sub_base } from './base'
import { SubBook } from './book'

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
}

export const SubNpc = new _n()
