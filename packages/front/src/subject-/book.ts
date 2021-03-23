import { BehaviorSubject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { ipc } from 'tool-/electron'
import { mk_uuid } from 'tool-/uuid'
import { _sub_base } from './base'
import { SubOption } from './option'

class _book extends _sub_base<book_option_vo> {
    /** 创建新的 */
    make() {
        return {
            id: mk_uuid(),
            name: '',
            src: '',
            cover: '',
            last_20_chapter: [],
            editer: {
                size: {
                    x: 300,
                    w: 400,
                    y: 100,
                    h: 600,
                },
            },
        }
    }
    load() {
        const li = SubOption.edit$.value?.shelf.list ?? []
        // console.log('li', li)

        const re: msg_dto<book_option_vo[]> = ipc().sendSync('book_load_li', li)
        this.li$.next(re.data)
    }
}

/** 书目 */
export const SubBook = new _book()
