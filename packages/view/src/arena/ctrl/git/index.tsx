// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import SectionHeader from '@/component/section-header'
import { ipc } from '@/const'
import { book_use$, get_cur_book_src } from '@/source'
import { next_router } from '@/function/router'
import ThemeButton from '@/component/theme-button'

/** git仓库 */
export default function Git() {
    const [has, set_has] = useState<null | boolean>(null)
    useEffect(() => {
        const book_src = get_cur_book_src()
        if (book_src) {
            ipc().send('git_check', book_src)
            ipc().once('git_check', (_, b) => {
                if (typeof b === 'boolean') {
                    set_has(b)
                }
            })
        }
    }, [])
    if (!get_cur_book_src()) {
        next_router('shelf')
        return null
    }
    return (
        <div className={s.Git}>
            <SectionHeader> 史诗</SectionHeader>
            {has ? <Histroy /> : <NoHas />}
        </div>
    )
}

function Histroy() {
    return (
        <div className={s.Histroy}>
            <ThemeButton
                onClick={() => {
                    // ipc().sendSync('git_save')
                }}
            >
                333
            </ThemeButton>
        </div>
    )
}

function NoHas() {
    return (
        <div className={s.NoHas}>
            <div>当前目录没有创建仓库</div>
            <ThemeButton
                onClick={() => {
                    const b = ipc().sendSync('git_init', get_cur_book_src())
                    console.log(b)
                }}
            >
                创建
            </ThemeButton>
        </div>
    )
}
