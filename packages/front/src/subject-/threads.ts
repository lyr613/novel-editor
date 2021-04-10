import { BehaviorSubject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { mk_uuid } from 'tool-/uuid'
import { _sub_base } from './base'

class _t {
    obj$ = new BehaviorSubject(this.default_obj)
    editing_item$ = new BehaviorSubject(null as null | threads_item_vo)
    static_items$ = this.obj$.pipe(
        switchMap((obj) =>
            this.editing_item$.pipe(
                map((edit) => {
                    const li = obj.items
                    return li.filter((v) => v.id !== edit?.id)
                }),
            ),
        ),
    )

    get default_obj() {
        const re: threads_vo = {
            canvas: {
                zoom: 1,
                width: 0,
                height: 0,
            },
            items: [],
        }
        return re
    }
    make_item() {
        const re: threads_item_vo = {
            x: 0,
            y: 0,
            name: '',
            remark: '',
            nexts: [],
            id: mk_uuid(),
            link_chapter: '',
        }
        return re
    }
}

export const SubThreads = new _t()
