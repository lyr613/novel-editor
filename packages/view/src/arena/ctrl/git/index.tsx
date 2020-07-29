// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import SectionHeader from '@/component/section-header'
import { ipc } from '@/const'
import { get_cur_book_src } from '@/source/book'
import { next_router } from '@/function/router'
import Checking0 from './checking0'
import NoHas1 from './no-has1'
import DidInit2 from './did-init2'
import { git_init_status$ } from './subj'
import { useObservable } from 'rxjs-hooks'

/** git仓库
 * 0: 初始: 检查中
 * 1: 没有初始化过
 * 2: 已经有
 * -1: 查找失败
 */
export default function Git() {
    const status = useObservable(() => git_init_status$, 0)
    useEffect(() => {
        const book_src = get_cur_book_src()
        if (book_src) {
            ipc().send('git_check', book_src)
            ipc().once('git_check', (_, n) => {
                console.log('git 状态码', n)
                git_init_status$.next(Number(n))
            })
        }
        return () => {
            git_init_status$.next(0)
        }
    }, [])
    if (!get_cur_book_src()) {
        next_router('shelf')
        return null
    }
    return (
        <div className={s.Git}>
            {status === 0 && <Checking0 />}
            {status === 1 && <NoHas1 />}
            {status === 2 && <DidInit2 />}
        </div>
    )
}
