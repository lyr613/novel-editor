import { ipc } from 'tool-/electron'
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
}

/** 词条  数据立方体 */
export const SubCube = new _c()
