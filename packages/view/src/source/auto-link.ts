// 一些自动订阅, 先集中管理

import { book_use$, get_cur_book_src } from './book'
import { debounceTime, switchMap } from 'rxjs/operators'
import { node_id_text_map$ } from './node'
import { fs_write } from './fs-common'

export function auto_link_observable() {
    // 切换书时, 改app标题
    book_use$.subscribe((bk) => {
        if (bk?.name) {
            document.title = bk.name
        }
    })
    /** 自动保存编辑的节 */
    node_id_text_map$.pipe(debounceTime(1000)).subscribe((m) => {
        m.forEach((v, k) => {
            try {
                fs_write('txt', [v.book_src, 'chapters', v.node_id + '.txt'], v.text)
                m.delete(k)
            } catch (error) {
                alert(`保存章节${v.node_name}失败`)
            }
        })
    })
}
