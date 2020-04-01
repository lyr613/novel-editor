// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import s from './s.module.scss'
import { DefaultButton, ActionButton, PrimaryButton } from 'office-ui-fabric-react'
import { useObservable } from 'rxjs-hooks'
import { book_list$, of_book, book_use$, select_dir, load_books_auto } from '@/source'
import { ipc } from '@/const'
import { next_router } from '@/function/router'
import ThemeButton from '@/component/theme-button'
import { editer_setting$ } from '@/subject'
import { map } from 'rxjs/operators'
import { shallowCopy } from '@/rx/shallow-copy'

/** 书架 */
export default function Shelf() {
    useEffect(() => {
        setTimeout(() => {
            load_books_auto()
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
    const list = useObservable(() => book_list$.pipe(shallowCopy()), [])
    return (
        <div className={s.BookList}>
            {list.map((book, i) => (
                <div className={s.book} key={book.id}>
                    <div className={s.left}>
                        <div className={s.line}>
                            <span className={s.label}>书名</span>
                            <span>{book.name || '未命名'}</span>
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
                        <div
                            className={s.line}
                            style={{
                                position: 'absolute',
                                left: 0,
                                bottom: 0,
                                margin: '10px',
                            }}
                        >
                            <ThemeButton
                                onClick={() => {
                                    // if (book_use$.value?.id !== book.id) {
                                    // 	node_focu_buffer$.next([])
                                    // }
                                    book_use$.next(book)
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
                                    book_use$.next(book)
                                    next_router('search')
                                }}
                            >
                                搜索
                            </DefaultButton>
                            <DefaultButton
                                onClick={() => {
                                    book_use$.next(book)
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
                                    book_use$.next(book)
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
                                    book_use$.next(book)
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
                                    book_use$.next(book)
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
                                    book_use$.next(book)
                                    next_router('map')
                                }}
                                style={{
                                    marginRight: '10px',
                                }}
                            >
                                地图
                            </DefaultButton>
                            {/* <DefaultButton
                                onClick={() => {
                                    book_use$.next(book)
                                    next_router('git')
                                }}
                                style={{
                                    marginRight: '10px',
                                }}
                            >
                                仓库
                            </DefaultButton> */}
                            <DefaultButton
                                onClick={() => {
                                    const p = editer_setting$.value
                                    p.shelf.book_list = p.shelf.book_list.filter((v) => v !== book.src)
                                    editer_setting$.next(p)
                                    load_books_auto()
                                }}
                                style={{
                                    marginRight: '10px',
                                }}
                            >
                                移除
                            </DefaultButton>
                        </div>
                    </div>
                    <div
                        className={s.cover}
                        style={{
                            backgroundImage: `url(${book.cover})`,
                        }}
                    ></div>
                </div>
            ))}
        </div>
    )
}

function NewOne() {
    return (
        // <ActionButton
        // 	iconProps={{ iconName: 'Add' }}
        // 	className={s.newone}
        // 	onClick={() => {
        // 		const part = ipcRenderer.sendSync('book-new', ['openDirectory'])
        // 		if (part) {
        // 			const nbook = of_book(part)
        // 			const li = [...book_list$.value, nbook]
        // 			book_list$.next(li)
        // 			book_local.next(li)
        // 			book_local.save()
        // 		}
        // 	}}
        // 	styles={{
        // 		label: {
        // 			color: clrs[8],
        // 		},
        // 	}}
        // >
        // 	新一本
        // </ActionButton>
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
                        load_books_auto()
                    }
                })
            }}
        >
            新一本
        </ThemeButton>
    )
}
