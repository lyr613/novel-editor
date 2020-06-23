import { Subject, of, BehaviorSubject } from 'rxjs'
import { debounceTime, switchMap } from 'rxjs/operators'
import { npc_li$, chapter_list$, book_use$, get_cur_book_src } from '@/source'
import { ipc } from '@/const'

/** 查询npc出现频率 */
export const npc_frequency_find$ = new BehaviorSubject(1).pipe(
    debounceTime(1000),
    switchMap(() => npc_frequency_find()),
)
interface appear_infor {
    position: number
    percentage: number
    node_id: string
}

interface frequency {
    names: string[]
    id: string
    appear_infors: appear_infor[]
}
function npc_frequency_find(): Promise<frequency[]> {
    return new Promise((suc) => {
        const book_src = get_cur_book_src()
        const npcs = npc_li$.value
        const cps = chapter_list$.value
        if (!book_src || !npcs.length || !cps.length) {
            suc([])
            return
        }
        ipc().send('npc_frequency', book_src, cps, npcs)
        ipc().once('npc_frequency', (_, re: frequency[]) => {
            suc(re)
        })
    })
}
