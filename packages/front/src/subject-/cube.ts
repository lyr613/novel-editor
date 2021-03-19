import { ipc } from 'tool-/electron'
import { _sub_base } from './base'
import { SubBook } from './book'

class _c extends _sub_base<cube_group_vo> {
    /** 加载卷章 */
    load() {
        const volumes_re: msg_dto<cube_group_vo[]> = ipc().sendSync('chapter_load', SubBook.use_id$.value)
        // console.log('volumes', volumes_re.data)
        if (volumes_re.b) {
            this.li$.next(volumes_re.data)
        }
    }
}

/** 词条  数据立方体 */
export const SubCube = new _c()
