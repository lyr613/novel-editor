// eslint-disable-next-line
import React, { useState, useEffect, useReducer } from 'react'
import s from './s.module.scss'
import SectionHeader from '@/component/section-header'
import ThemeLabel from '@/component/theme-label'
import { TextField } from 'office-ui-fabric-react'
import { ipc } from '@/const'
import { editer_setting$ } from '@/subject'
import { select_dir } from '@/source/fs-common'
import QvButton from '@/component/ui/button'

export default function Git() {
    return (
        <div className={s.Git}>
            <SectionHeader>从git仓库导入</SectionHeader>
            <Form />
            <Step />
        </div>
    )
}

function Form() {
    const [git_src, set_git_src] = useState('')
    const [dir_src, set_dir_src] = useState('')
    const git_src_use = git_src.replace(/\s/g, '')
    return (
        <div className={s.Form}>
            <div className={s.line}>
                <ThemeLabel>远程仓库地址</ThemeLabel>
                <TextField
                    value={git_src}
                    onChange={(_, ns) => {
                        ns = ns || ''
                        set_git_src(ns)
                    }}
                ></TextField>
            </div>
            <div className={s.line}>
                <ThemeLabel>选择一个空文件夹: {dir_src}</ThemeLabel>
                <QvButton
                    onClick={async () => {
                        const re = await select_dir()
                        if (!re.empty) {
                            alert('选择一个空文件夹')
                            return
                        }
                        set_dir_src(re.src)
                    }}
                >
                    选择存放位置
                </QvButton>
            </div>
            <div className={s.line}>
                <QvButton
                    withTheme
                    disabled={!dir_src || !git_src_use}
                    onClick={() => {
                        ipc().send('import_git', git_src_use, dir_src)
                    }}
                >
                    开始导入
                </QvButton>
            </div>
        </div>
    )
}

function Step() {
    const [arr, set_arr] = useReducer<(arr: string[], nw: string) => string[]>((arr, nw) => [...arr, nw], [])
    useEffect(() => {
        const lin = (_: any, str: string) => {
            set_arr(str)
            if (str.match(/^end:/)) {
                str = str.replace(/^end:/, '')
                const p = editer_setting$.value
                p.shelf.book_list.unshift(str)
                editer_setting$.next(p)
            }
        }

        ipc().on('import_git_step', lin)
        return () => {
            ipc().removeListener('import_git_step', lin)
        }
    }, [])
    return (
        <div className={s.Step}>
            {arr.map((st, i) => (
                <ThemeLabel key={i}>{st}</ThemeLabel>
            ))}
        </div>
    )
}
