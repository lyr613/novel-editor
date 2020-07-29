// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import SectionHeader from '@/component/section-header'
import ThemeLabel from '@/component/theme-label'
import { ipc } from '@/const'
import { TextField } from 'office-ui-fabric-react'
import ThemeButton from '@/component/theme-button'
import { get_cur_book_src } from '@/source/book'

/** 本地仓库的操作 */
export default function Local() {
    return (
        <div className={s.Local}>
            <SectionHeader>本地仓库操作</SectionHeader>
            <SaveLocal />
        </div>
    )
}

function SaveLocal() {
    // 储存备注
    const [git_msg, set_git_msg] = useState('')
    // 需要储存, 检查有没有更新
    const [need_save, set_need_save] = useState(false)
    const [label, set_label] = useState('检查是否有修改的文件...')
    useEffect(() => {
        const t = setTimeout(() => {
            const b = ipc().sendSync('git_check_can_save', get_cur_book_src())
            if (b) {
                set_need_save(true)
                set_label('储存上次以来的修改文件')
            } else {
                set_label('所有文件已储存到本地仓库')
            }
        }, 50)
        return () => {
            clearTimeout(t)
        }
    }, [])
    return (
        <div className={s.SaveLocal}>
            <ThemeLabel>{label}</ThemeLabel>
            {need_save && (
                <>
                    <TextField
                        value={git_msg}
                        onChange={(_, ns) => {
                            ns = ns || ''
                            set_git_msg(ns)
                        }}
                        placeholder="修改备注"
                        styles={{
                            root: {
                                marginBottom: '10px',
                                width: '400px',
                            },
                        }}
                    ></TextField>

                    <ThemeButton
                        disabled={!need_save}
                        onClick={() => {
                            const b = ipc().sendSync('git_local_save', get_cur_book_src(), git_msg.trim())
                            if (b) {
                                set_need_save(false)
                                set_git_msg('')
                                set_label('所有文件已储存到本地仓库')
                            } else {
                                set_label('储存失败， 重载app试试')
                            }
                        }}
                    >
                        储存更改
                    </ThemeButton>
                </>
            )}
        </div>
    )
}
