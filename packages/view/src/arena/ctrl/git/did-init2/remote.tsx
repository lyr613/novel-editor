// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import SectionHeader from '@/component/section-header'
import { useObservable } from 'rxjs-hooks'
import { git_remote_status$ } from '../subj'
import ThemeButton from '@/component/theme-button'
import { ipc } from '@/const'
import { get_cur_book_src } from '@/source'
import ThemeLabel from '@/component/theme-label'

/** 远程仓库的操作 */
export default function Remote() {
    const status = useObservable(() => git_remote_status$, 0)
    if (status !== 2) {
        return null
    }

    return (
        <div className={s.Remote}>
            <SectionHeader>远程仓库操作</SectionHeader>
            <Action />
        </div>
    )
}

function Action() {
    const [can_push, set_can_push] = useState(true)
    const [push_msg, set_push_msg] = useState('推送到远程仓库')
    const [can_pull, set_can_pull] = useState(true)
    const [pull_msg, set_pull_msg] = useState('拉取到本地仓库')
    useEffect(() => {
        function push(_: any, b: boolean) {
            console.log('推送', b)
            if (b) {
                set_push_msg('本地更新已推送到远程仓库')
            } else {
                set_push_msg('推送失败, 重载app试试')
            }
        }
        function pull(_: any, re: any) {
            const b = re.be_suc
            // const src = re.src
            console.log('拉取', b)
            if (b) {
                set_pull_msg('远程仓库已拉取到本地')
            } else {
                set_pull_msg('拉取失败, 重载app试试')
            }
        }
        ipc().on('git_push', push)
        ipc().on('git_pull', pull)
        return () => {
            ipc().removeListener('git_push', push)
            ipc().removeListener('git_pull', pull)
        }
    }, [])
    return (
        <div className={s.Action}>
            <ThemeLabel>{push_msg}</ThemeLabel>
            <ThemeButton
                onClick={() => {
                    ipc().send('git_push', get_cur_book_src())
                    set_can_push(false)
                    set_push_msg('上传中...')
                }}
                disabled={!can_push}
            >
                推到云端
            </ThemeButton>

            <div className={s.split}></div>

            <ThemeLabel>{pull_msg}</ThemeLabel>
            <ThemeButton
                onClick={() => {
                    ipc().send('git_pull', get_cur_book_src())
                    set_can_pull(false)
                    set_pull_msg('拉取中...')
                }}
                disabled={!can_pull}
            >
                拉到本地
            </ThemeButton>
        </div>
    )
}
