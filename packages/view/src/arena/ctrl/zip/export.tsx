// eslint-disable-next-line
import React, { useState, useEffect, useReducer } from 'react'
import s from './s.module.scss'
import ThemeLabel from '@/component/theme-label'
import { Dropdown } from 'office-ui-fabric-react'
import { useObservable } from 'rxjs-hooks'
import { ipc } from '@/const'
import SectionHeader from '@/component/section-header'
import { book_li$, find_book_li_auto } from '@/source/book'
import { select_dir } from '@/source/fs-common'
import QvButton from '@/component/ui/button'

export default function Exprt() {
    const [dir_src, set_dir_src] = useState('')
    const [book_src, set_book_src] = useState('')
    const books = useObservable(() => book_li$, [])

    const book_sel = books.map((bk) => ({
        key: bk.src,
        text: bk.name,
    }))
    useEffect(() => {
        find_book_li_auto()
    }, [])

    return (
        <div className={s.Export}>
            <SectionHeader>导出文本</SectionHeader>
            <div className={s.line}>
                <ThemeLabel> 要导出的书</ThemeLabel>
                <Dropdown
                    options={book_sel}
                    className={s.dropdown}
                    onChange={(_, opt) => {
                        const src = opt?.key as string
                        set_book_src(src)
                    }}
                ></Dropdown>
            </div>
            <div className={s.line}>
                <ThemeLabel>选择一个文件夹: {dir_src}</ThemeLabel>
                <QvButton
                    onClick={async () => {
                        const re = await select_dir()
                        set_dir_src(re.src)
                    }}
                >
                    选择存放位置
                </QvButton>
            </div>
            <div className={s.line}>
                <QvButton
                    withTheme
                    onClick={() => {
                        ipc().send('export_txt', book_src, dir_src)
                    }}
                >
                    开始导出
                </QvButton>

                <Step />
            </div>
        </div>
    )
}

/** 解析步骤 */
function Step() {
    const [arr, set_arr] = useReducer<(arr: string[], nw: string) => string[]>((arr, nw) => [...arr, nw], [])
    useEffect(() => {
        const lin = (_: any, str: string) => {
            set_arr(str)
        }

        ipc().on('export_txt_step', lin)
        return () => {
            ipc().removeListener('export_txt_step', lin)
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
