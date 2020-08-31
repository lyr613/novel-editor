// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import SectionHeader from '@/component/section-header'
import { TextField } from 'office-ui-fabric-react'
import { ipc } from '@/const'
import { git_remote_status$ } from '../subj'
import { useObservable } from 'rxjs-hooks'
import { get_cur_book_src } from '@/source/book'
import QvButton from '@/component/ui/button'
import QvLabel from '@/component/ui/label'

/** 远程仓库设置 */
export default function RemoteSet() {
    return (
        <div className={s.RemoteSet}>
            <SectionHeader>远程仓库设置</SectionHeader>
            <Form />
        </div>
    )
}

function Form() {
    const status = useObservable(() => git_remote_status$, 0)
    const [label, set_label] = useState('添加或修改远程仓库')
    // 远程仓库地址
    const [remote, set_remote] = useState('')
    return (
        <div className={s.Form}>
            <QvLabel>{label}</QvLabel>
            <TextField
                value={remote}
                onChange={(_, ns) => {
                    ns = ns || ''
                    set_remote(ns)
                }}
                placeholder="地址"
                styles={{
                    root: {
                        marginBottom: '10px',
                        width: '400px',
                    },
                }}
            ></TextField>
            {status === 1 && (
                <QvButton
                    withTheme
                    onClick={() => {
                        const b = ipc().sendSync('git_set_remote', get_cur_book_src(), remote.trim(), 'add')
                        console.log('添加远程仓库', b)
                        if (b) {
                            set_label('远程仓库添加成功')
                            git_remote_status$.next(2)
                        } else {
                            set_label('远程仓库添加失败, 重载app试试')
                        }
                    }}
                >
                    添加
                </QvButton>
            )}
            {status === 2 && (
                <QvButton
                    withTheme
                    onClick={() => {
                        const b = ipc().sendSync('git_set_remote', get_cur_book_src(), remote.trim(), 'update')
                        console.log('修改远程仓库', b)
                        if (b) {
                            set_label('远程仓库修改成功')
                        } else {
                            set_label('远程仓库修改失败, 重载app试试')
                        }
                    }}
                >
                    修改
                </QvButton>
            )}
        </div>
    )
}
