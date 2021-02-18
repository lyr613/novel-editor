import React, { useState, useEffect } from 'react'
import { style } from './style'
import { css } from 'aphrodite/no-important'
import { useLocation } from 'react-router-dom'
import { parse } from 'query-string'
import { ipc } from 'tool-/electron'
import { SubBook } from 'subject-/book'
import MonacoEdit from './monaco'

/**
 * #### 编辑选中的书目
 */
export default function BookEdit() {
    return (
        <div className={css(style.root)}>
            <LoadInfor />
            <MonacoEdit />
        </div>
    )
}

/** 加载书目信息 */
function LoadInfor() {
    const p = useLocation()

    useEffect(() => {
        const so = parse(p.search)
        const bookid = so.bid
        // console.log(bookid, 'bookid')
        const book: book_vo | null = ipc().sendSync('load_book', bookid)
        if (!book) {
            return
        }
        SubBook.li$.next([book])
        SubBook.use_id$.next(book.id)
        // console.log('book', book)
    }, [p])
    return null
}
