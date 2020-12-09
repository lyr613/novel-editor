import { BehaviorSubject } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

const book_li$ = new BehaviorSubject([] as book_vo[])

const book_use_id$ = new BehaviorSubject('')

const book_use$ = book_li$.pipe(
    switchMap((li) => book_use_id$.pipe(map((id) => li.find((v) => v.id === id)))),
    map((v) => v || null),
)
