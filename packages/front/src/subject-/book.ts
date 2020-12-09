import { BehaviorSubject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'
import { mk_uuid } from 'tool-/uuid'

const book_li$ = new BehaviorSubject([] as book_vo[])

const book_use_id$ = new BehaviorSubject('')

const book_use$ = book_li$.pipe(
    switchMap((li) => book_use_id$.pipe(map((id) => li.find((v) => v.id === id)))),
    map((v) => v || null),
)

export function mk_book(): book_vo {
    return {
        src: '',
        id: mk_uuid(),
        name: '',
        cover: '',
        git: false,
    }
}
