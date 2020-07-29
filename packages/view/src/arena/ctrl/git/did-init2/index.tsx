// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { useObservable } from 'rxjs-hooks'
import { git_remote_status$ } from '../subj'
import { ipc } from '@/const'
import Local from './local'
import RemoteSet from './remote-set'
import Remote from './remote'
import { get_cur_book_src } from '@/source/book'

/** 已经初始化, 检查是否有远端仓库 */
export default function DidInit2() {
    useEffect(() => {
        const check_re: number = ipc().sendSync('git_check_has_remote', get_cur_book_src())
        console.log('远程仓库码', check_re)
        git_remote_status$.next(Number(check_re))
        return () => {
            git_remote_status$.next(0)
        }
    }, [])
    return (
        <div className={s.DidInit2}>
            <RemoteSet />
            <Local />
            <Remote />
        </div>
    )
}
