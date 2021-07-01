import { ipc } from 'tool-/electron'
import { mk_uuid } from 'tool-/uuid'
import { _sub_base } from './base'
import { SubBook } from './book'

class _c extends _sub_base<cube_group_vo> {
    /** 加载卷章 */
    load() {
        const re: msg_dto<cube_group_vo[]> = ipc().sendSync('cube_load', SubBook.use_id$.value)
        // console.log('volumes', volumes_re.data)
        if (re.b) {
            this.li$.next(re.data)
        }
    }
    save(new_li: cube_group_vo[]) {
        const re = ipc().sendSync('cube_save', SubBook.use_id$.value, new_li)
        return re
    }
    make(): cube_group_vo {
        return {
            id: mk_uuid(),
            name: '',
            sort: Number.MAX_SAFE_INTEGER,
            name_show: '',
            children: [],
        }
    }
    make_item(): cube_item_vo {
        return {
            id: mk_uuid(),
            name: '',
            remark: '',
            sort: Number.MAX_SAFE_INTEGER,
            name_show: '',
            level: 0,
        }
    }
}

/** 词条  数据立方体 */
export const SubCube = new _c()
