// 一些自动订阅, 先集中管理

import { book_use$, get_cur_book_src } from './book'
import { debounceTime, switchMap } from 'rxjs/operators'
import { node_use_buffer$, node_text_from_fs$, node_use$, node_id_text_map$ } from './node'
import { fs_write } from './fs-common'

export function auto_link_observable() {
    // 切换书时, 改app标题
    book_use$.subscribe((bk) => {
        if (bk?.name) {
            document.title = bk.name
        }
    })
    // 当切换书时, 清空buffer和text
    book_use$.pipe(debounceTime(10)).subscribe(() => {
        node_use_buffer$.next([])
        node_text_from_fs$.next('')
        node_use$.next(null)
    })
    /** 更新buffer时, 储存到硬盘以便下次直接打开 */
    node_use$
        .pipe(
            switchMap(() => node_use_buffer$),
            debounceTime(500),
        )
        .subscribe((buf) => {
            const booksrc = get_cur_book_src()
            if (!booksrc) {
                return
            }
            const ids = buf.map((v) => v.id)
            const use_id = node_use$.value?.id ?? ''
            const dto = {
                ids,
                use_id,
            }
            fs_write('json', [booksrc, 'prev-edit'], dto)
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
