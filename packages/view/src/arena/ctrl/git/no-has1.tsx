// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { ipc } from '@/const'
import { get_cur_book_src } from '@/source/book'
import { git_init_status$ } from './subj'
import QvButton from '@/component/ui/button'

/** 没有初始化过 */
export default function NoHas1() {
    const [msg, set_msg] = useState('...')
    return (
        <div className={s.NoHas1}>
            <div className={s.label}>没有创建仓库</div>
            <QvButton
                withTheme
                onClick={() => {
                    const b: boolean = ipc().sendSync('git_init', get_cur_book_src())
                    if (b) {
                        set_msg('创建成功')
                        git_init_status$.next(2)
                    } else {
                        set_msg('创建失败')
                    }
                    console.log(b)
                }}
            >
                创建
            </QvButton>
            <div className={s.msg}>{msg}</div>
        </div>
    )
}
