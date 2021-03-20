import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { useLocation } from 'react-router-dom'
import { parse } from 'query-string'
import { ipc } from 'tool-/electron'
import { SubBook } from 'subject-/book'
import MonacoEdit from './monaco'
import { SubMonaco } from 'subject-/monaco'
import { SubOption } from 'subject-/option'
import Volume from './volume'
import { SubVolume } from 'subject-/volume'
import Npc from './npc'
import { timer } from 'rxjs'
import { take } from 'rxjs/operators'
import Cube from './cube'
import { SubCube } from 'subject-/cube'
import { SubNpc } from 'subject-/npc'

/**
 * #### 编辑选中的书目
 */
export default function BookEdit() {
    return (
        <div className={css(style.book_edit)}>
            <LoadInforSub />
        </div>
    )
}

/** 加载书目信息 */
function LoadInforSub() {
    const p = useLocation()
    const [wait, next_wait] = useState(0)

    useEffect(() => {
        const so = parse(p.search)
        const bookid = so.bid as string
        // console.log(bookid, 'bookid')
        const book_re: msg_dto<book_vo> = ipc().sendSync('book_get_cache', bookid)
        if (!book_re.b) {
            return
        }
        const book = book_re.data
        const app_opt_msg: msg_dto<option_vo> = ipc().sendSync('option_load')
        const app_opt = app_opt_msg.data
        SubOption.edit$.next(app_opt)
        //
        SubBook.li$.next([book])
        SubBook.use_id$.next(book.id)
        document.title = book.name
        // console.log('book', book)
        // 加载章节
        SubVolume.bookid = book.id
        SubVolume.load()

        // 加载词条
        SubCube.load()
        // 加载角色
        SubNpc.load()

        // 加载monaco
        /**
         * 始终最后加载monaco, 加载完成后显示可编辑模块
         */
        SubMonaco.load_monaco()
        // 显示项目
        timer(100, 500)
            .pipe(take(20))
            .subscribe((n) => {
                next_wait(n)
            })
    }, [p])
    if (wait === 0) {
        return (
            <div
                style={{
                    padding: 20,
                    fontSize: 16,
                }}
            >
                加载中...
            </div>
        )
    }
    return (
        <>
            {wait > 0 && <MonacoEdit />}
            {wait > 1 && <Volume />}
            {wait > 2 && <Npc />}
            {wait > 3 && <Cube />}
        </>
    )
}
