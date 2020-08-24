// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { book_use_id$, find_book_li_auto } from '@/source/book'
import NewOne from './new-one'
import List from './list'
import { style as s } from './style'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'

/** 书架 */
export default function Shelf() {
    useEffect(() => {
        book_use_id$.next('')
        setTimeout(() => {
            find_book_li_auto()
        }, 50)
    }, [])
    return (
        <div className={css(s.root, sc.bgclrl(7))}>
            <NewOne />
            <List />
        </div>
    )
}
