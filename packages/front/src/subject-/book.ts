import { BehaviorSubject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { mk_uuid } from 'tool-/uuid'
import { _sub_base } from './base'

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
}

/** 书目 */
export const SubBook = new _book()
