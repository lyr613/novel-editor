// 一些自动订阅, 先集中管理

import { book_use$, get_cur_book_src } from './book'

export function auto_link_observable() {
    // 切换书时, 改app标题
    book_use$.subscribe((bk) => {
        if (bk?.name) {
            document.title = bk.name
        }
    })
}
