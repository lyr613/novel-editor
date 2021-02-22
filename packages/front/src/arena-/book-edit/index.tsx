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

/**
 * #### 编辑选中的书目
 */
export default function BookEdit() {
    return (
        <div className={css(style.book_edit)}>
            <LoadInfor />
            <MonacoEdit />
            <Volume />
        </div>
    )
}

/** 加载书目信息 */
function LoadInfor() {
    const p = useLocation()

    useEffect(() => {
        const so = parse(p.search)
        const bookid = so.bid as string
        // console.log(bookid, 'bookid')
        const book: book_vo | null = ipc().sendSync('load_book', bookid)
        if (!book) {
            return
        }
        const app_opt = ipc().sendSync('option_load')
        SubOption.edit$.next(app_opt)
        //
        SubBook.li$.next([book])
        SubBook.use_id$.next(book.id)
        document.title = book.name
        // console.log('book', book)
        // 加载章节
        SubVolume.bookid = book.id
        SubVolume.load()

        // 加载monaco
        /**
         * 始终最后加载monaco, 加载完成后显示可编辑模块
         */
        SubMonaco.load_monaco()
    }, [p])
    return null
}
