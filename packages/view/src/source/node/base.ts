import { chapter_li$ } from '../chapter-node'
import { map } from 'rxjs/operators'

/** 节map, id: 节 */
export const node_map$ = chapter_li$.pipe(
    map((li) => {
        const m = new Map<string, node>()
        li.forEach((cp) => {
            cp.children.forEach((nd) => {
                m.set(nd.id, nd)
            })
        })
        return m
    }),
)
