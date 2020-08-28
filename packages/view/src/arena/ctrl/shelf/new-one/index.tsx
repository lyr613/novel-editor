import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'
import { select_dir } from '@/source/fs-common'
import { editer_setting$ } from '@/subject/edit-setting'
import { find_book_li_auto } from '@/source/book'
import QvButton from '@/component/ui/button'

/** NewOne */
export default function NewOne() {
    return (
        <div className={css(sc.padd(10, 10))}>
            <QvButton
                withTheme
                onClick={() => {
                    select_dir().then((re) => {
                        if (re.src) {
                            const p = editer_setting$.value
                            if (!p.shelf.book_list.find((v) => v === re.src)) {
                                p.shelf.book_list.unshift(re.src)
                            }
                            editer_setting$.next(p)
                            find_book_li_auto()
                        }
                    })
                }}
            >
                新一本
            </QvButton>
        </div>
    )
}
