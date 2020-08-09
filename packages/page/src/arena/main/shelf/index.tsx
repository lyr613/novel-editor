// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import { style as s } from './style'
import { DefaultButton, TextField } from 'office-ui-fabric-react'
import { useObservable } from 'rxjs-hooks'
import { ipc } from '@/util/electron-help'
import { next_router } from '@/router'
import ThemeLabel from '@/component/theme-label'
import ThemeButton from '@/component/theme-button'
import { editer_setting$ } from '@/subject/edit-setting'
import { shallowCopy } from '@/util/rx-shallow-copy'
import { book_use_id$, find_book_li_auto, book_li$ } from '@/source/book'
import { select_dir } from '@/source/fs-common'
import { css } from 'aphrodite'
import { global_style as gs, style_creater as sc } from '@/style/global'
import { StroageBook } from '@/storage/books'

/** 书架 */
export default function Shelf() {
    useEffect(() => {
        book_use_id$.next('')
        setTimeout(() => {
            find_book_li_auto()
        }, 50)
    }, [])
    return (
        <div id="shelf" className={css(s.root)}>
            <NewOne />
            <BookBox />
        </div>
    )
}

/** 新一本 */
function NewOne() {
    return (
        <ThemeButton
            className={css(s.NewOne, sc.mar(10))}
            onClick={() => {
                select_dir().then((re) => {
                    if (re.src) {
                        StroageBook.add(re.src)
                        find_book_li_auto()
                    }
                })
            }}
        >
            新一本
        </ThemeButton>
    )
}

/** 列表 */
function BookBox() {
    const list = useObservable(() => book_li$.pipe(shallowCopy()), [])
    const editer_sett = useObservable(() => editer_setting$)

    return (
        <div className={css(s.BookBox)}>
            {list.map((book) => (
                <OneBook book={book} key={book.id} editer_sett={editer_sett} />
            ))}
        </div>
    )
}

/** 一本 */
function OneBook(p: { book: book_dto; editer_sett: setting_dto | null }) {
    const { book, editer_sett } = p

    return (
        <div className={css(s.OneBook, gs.overhidd, sc.mar(10), sc.padd(10), gs.flex)}>
            {NamePart(book)}
            {SrcPart(book)}
            {book.git && <Remote src={book.src} />}
            {BtnPart(book, editer_sett?.git === true)}
            {CoverPart(book)}
        </div>
    )
}

/** 书名 */
function NamePart(book: book_dto) {
    const [editing_name, set_editing_name] = useState(false)
    const [form_name, set_form_name] = useState(book.name)
    const from_name_use = form_name.replace(/\s/g, '')

    return (
        <div className={css(gs.flhc, sc.fts(16))}>
            <span className={css(sc.padd(0, 10, 0, 0))}>书名: </span>
            {!editing_name ? (
                <span
                    className={css(gs.cur, s.hoverbg)}
                    onClick={() => {
                        set_editing_name(true)
                    }}
                >
                    {book.name || '未命名'}
                </span>
            ) : (
                <>
                    <TextField
                        value={form_name}
                        onChange={(_, ns) => {
                            ns = ns || ''
                            set_form_name(ns)
                        }}
                    ></TextField>
                    <ThemeButton
                        disabled={!from_name_use}
                        onClick={() => {
                            const b = ipc().sendSync('book_set_name', book.src, from_name_use)
                            if (!b) {
                                alert('修改失败')
                                return
                            }
                            find_book_li_auto()
                            set_editing_name(false)
                        }}
                    >
                        好
                    </ThemeButton>
                </>
            )}
        </div>
    )
}

/** 路径 */
function SrcPart(book: book_dto) {
    return (
        <div className={css(gs.flhc, sc.fts(16))}>
            <span className={css(sc.padd(0, 10, 0, 0))}>路径:</span>
            <span
                className={css(gs.cur, s.hoverbg)}
                onClick={() => {
                    ipc().send('fs_show', [book.src])
                }}
            >
                {book.src}
            </span>
        </div>
    )
}

/** 下面的一排按钮 */
function BtnPart(book: book_dto, with_git: boolean) {
    return (
        <div className={css(gs.flhc, sc.mar('auto', 0, 0))}>
            <ThemeButton
                onClick={() => {
                    book_use_id$.next(book.id)
                    next_router('edit')
                }}
                style={{
                    marginRight: '10px',
                }}
            >
                编写
            </ThemeButton>
            <DefaultButton
                onClick={() => {
                    book_use_id$.next(book.id)
                    next_router('search')
                }}
            >
                搜索
            </DefaultButton>
            <DefaultButton
                onClick={() => {
                    book_use_id$.next(book.id)
                    next_router('outline')
                }}
                style={{
                    margin: '0 10px',
                }}
            >
                大纲
            </DefaultButton>
            <DefaultButton
                onClick={() => {
                    book_use_id$.next(book.id)
                    next_router('incident')
                }}
                style={{
                    marginRight: '10px',
                }}
            >
                事件
            </DefaultButton>
            <DefaultButton
                onClick={() => {
                    book_use_id$.next(book.id)
                    next_router('npc')
                }}
                style={{
                    marginRight: '10px',
                }}
            >
                角色
            </DefaultButton>
            <DefaultButton
                onClick={() => {
                    book_use_id$.next(book.id)
                    next_router('table')
                }}
                style={{
                    marginRight: '10px',
                }}
            >
                表格
            </DefaultButton>
            <DefaultButton
                onClick={() => {
                    book_use_id$.next(book.id)
                    next_router('map')
                }}
                style={{
                    marginRight: '10px',
                }}
            >
                地图
            </DefaultButton>
            {with_git && (
                <DefaultButton
                    onClick={() => {
                        book_use_id$.next(book.id)
                        next_router('git')
                    }}
                    style={{
                        marginRight: '10px',
                    }}
                >
                    仓库
                </DefaultButton>
            )}
            <DefaultButton
                onDoubleClick={() => {
                    const p = editer_setting$.value
                    p.shelf.book_list = p.shelf.book_list.filter((v) => v !== book.src)
                    editer_setting$.next(p)
                    find_book_li_auto()
                }}
                style={{
                    marginRight: '10px',
                }}
            >
                隐藏
            </DefaultButton>
        </div>
    )
}

/** 封面 */
function CoverPart(book: book_dto) {
    return book.cover ? (
        <img
            className={css(s.cover)}
            src={book.cover}
            alt=""
            onClick={() => {
                ipc().send('book_set_cover', book.src)
            }}
        />
    ) : (
        <div
            className={css(s.nocover)}
            onClick={() => {
                ipc().sendSync('book_set_cover', book.src)
            }}
        >
            点击此处打开文件夹, 将封面图片命名为 preview 放到打开的文件夹内
        </div>
    )
}

/** 有远程仓库时, 显示此方便更新 */
function Remote(p: { src: string }) {
    const { src } = p
    const [label, set_label] = useState('检查到远程仓库, 点此拉取更新到本地')
    const [can_pull, set_can_pull] = useState(true)
    useEffect(() => {
        function pull(_: any, re: any) {
            const b = re.be_suc
            const src = re.src
            if (src !== p.src) {
                return
            }
            console.log('拉取', b)
            if (b) {
                set_label('已拉取到本地')
            } else {
                set_label('拉取失败, 可能是网络问题')
            }
        }
        ipc().on('git_pull', pull)
        return () => {
            ipc().removeListener('git_pull', pull)
        }
    }, [])
    return (
        <div className={css(sc.mar('auto', 0, 10), sc.fts(16))}>
            <ThemeLabel
                onClick={() => {
                    if (!can_pull) {
                        return
                    }
                    ipc().send('git_pull', src)
                    set_label('拉取中...')
                    set_can_pull(false)
                }}
                disabled={!can_pull}
                styles={{
                    root: {
                        cursor: can_pull ? 'pointer' : '',
                    },
                }}
            >
                {label}
            </ThemeLabel>
        </div>
    )
}
