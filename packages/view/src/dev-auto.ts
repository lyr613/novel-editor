import { filter, take } from 'rxjs/operators'
import { next_router } from './router/router'
import { book_li$, book_use_id$ } from './source/book'
import { sleep } from './util/sleep'

/** 开发模式下, 自动做一些动作 */
export async function __dev_auto() {
    console.log('src / dev-auto.ts 自动调试动作')
    console.log(' 自动跳到npc编辑页 ')

    sleep(1000)
    book_li$
        .pipe(
            filter((ls) => ls.length > 0),
            take(1),
        )
        .subscribe((books) => {
            book_use_id$.next(books[0].id)
            next_router('npc', 'link')
        })
}
