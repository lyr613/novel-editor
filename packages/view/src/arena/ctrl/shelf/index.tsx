// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { DefaultButton, TextField } from 'office-ui-fabric-react'
import { useObservable } from 'rxjs-hooks'
import { book_li$, select_dir, find_book_li_auto, book_use_id$ } from '@/source'
import { ipc } from '@/const'
import { next_router } from '@/function/router'
import ThemeButton from '@/component/theme-button'
import { editer_setting$ } from '@/subject'
import { shallowCopy } from '@/rx/shallow-copy'
import ThemeLabel from '@/component/theme-label'

/** 书架 */
export default function Shelf() {
    useEffect(() => {
        book_use_id$.next('')
        setTimeout(() => {
            find_book_li_auto()
        }, 50)
    }, [])
    return (
        <div className={s.Shelf}>
            <NewOne />
            <BookList />
        </div>
    )
}

function BookList() {
    const list = useObservable(() => book_li$.pipe(shallowCopy()), [])
    return (
        <div className={s.BookList}>
            {list.map((book) => (
                <OneBook book={book} key={book.id} />
            ))}
        </div>
    )
}

function NewOne() {
    return (
        <ThemeButton
            className={s.newone}
            onClick={() => {
                select_dir().then((re) => {
                    if (re.src) {
                        const p = editer_setting$.value
                        if (!p.shelf.book_list.find((v) => v === re.src)) {
                            p.shelf.book_list.unshift(re.src)
                        }
                        editer_setting$.next(p)
                        find_book_li_auto()
                    }
                })
            }}
        >
            新一本
        </ThemeButton>
    )
}

/** 一本 */
function OneBook(p: { book: book }) {
    const { book } = p
    const editer_sett = useObservable(() => editer_setting$)
    const [editing_name, set_editing_name] = useState(false)
    const [form_name, set_form_name] = useState(book.name)
    const from_name_use = form_name.replace(/\s/g, '')

    return (
        <div className={s.book} key={book.id}>
            <div className={s.left}>
                <div className={s.line}>
                    <span className={s.label}>书名</span>
                    {!editing_name ? (
                        <span
                            className={s.bkname}
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
                <div className={s.line}>
                    <span className={s.label}>路径</span>
                    <span
                        className={s.booksrc}
                        style={{ paddingRight: '10px' }}
                        onClick={() => {
                            ipc().send('fs_show', [book.src])
                        }}
                    >
                        {book.src}
                    </span>
                </div>
                {book.git && <Remote src={book.src} />}
                <div
                    className={s.btnline}
                    style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        margin: '10px',
                    }}
                >
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
                    {editer_sett?.git && (
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
            </div>
            {/* 封面 */}
            {book.cover ? (
                <img
                    className={s.cover}
                    src={book.cover}
                    alt=""
                    onClick={() => {
                        ipc().send('book_set_cover', book.src)
                    }}
                />
            ) : (
                <div
                    className={s.nocover}
                    style={{
                        backgroundImage: `url(${book.cover})`,
                    }}
                    onClick={() => {
                        ipc().sendSync('book_set_cover', book.src)
                    }}
                >
                    点击此处打开文件夹, 将封面图片命名为 preview 放到打开的文件夹内
                </div>
            )}
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
        <div className={s.Remote}>
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
