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
            slices: [],
        }
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
