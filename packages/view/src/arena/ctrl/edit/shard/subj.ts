import { map, merge } from 'rxjs/operators'
import { node_text_saver$, node_text_from_fs$ } from '@/source/node/txt'

/** 记录字数 */
export const word_count$ = node_text_saver$.pipe(
    map((v) => v.text),
    merge(node_text_from_fs$),
    map((t) => {
        return t.replace(/[^\u4e00-\u9fa5]/g, '').length
    }),
)
