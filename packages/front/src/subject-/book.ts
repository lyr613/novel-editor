import { BehaviorSubject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { ipc } from 'tool-/electron'
import { mk_uuid } from 'tool-/uuid'
import { _sub_base } from './base'
import { SubOption } from './option'

class _book extends _sub_base<book_vo> {
    /** 创建新的 */
    make() {
        return {
            src: '',
            id: mk_uuid(),
            name: '',
            cover: '',
            git: false,
        }
    }
    load() {
        const li = SubOption.edit$.value?.shelf.list ?? []
        // console.log('li', li)

        const re: msg_dto<book_vo[]> = ipc().sendSync('book_load_li', li)
        this.li$.next(re.data)
    }
}

/** 书目 */
export const SubBook = new _book()
