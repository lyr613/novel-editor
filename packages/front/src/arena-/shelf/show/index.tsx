import React, { useState, useEffect, Suspense } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from 'style-/global'
import { style as s, style_item } from './style'
import { SubScreen } from 'subject-/screen'
import { themes } from 'style-/theme'
import { SubBook } from 'subject-/book'
import { useObservable } from 'rxjs-hooks'
import { ipc } from 'tool-/electron'
import { Rt } from 'router-'
import { Icon } from '@fluentui/react'
import { map, switchMap } from 'rxjs/operators'
import { SubOption } from 'subject-/option'

/** Show */
export default function Show() {
    useEffect(() => {
        setTimeout(() => {
            SubBook.load()
        }, 17)
    }, [])
    return (
        <div className={css(s.Show)}>
            <List />
        </div>
    )
}

function List() {
    const li = useObservable(
        () =>
            SubBook.li$.pipe(
                switchMap((bks) =>
                    SubScreen.sub$(300).pipe(
                        map((WH) => {
                            const o = SubScreen.auto_width(WH.W, 260, 20)
                            return bks.map((item) => ({
                                item,
                                w: o.w,
                            }))
                        }),
                    ),
                ),
            ),
        [],
    )
    const w = li.length ? li[0].w : 300
    return (
        <div
            style={{
                overflow: 'auto',
                boxSizing: 'border-box',
                height: '100vh',
                padding: '20px 0 0 0',
            }}
        >
            {li.map((bk, i) => (
                <Item key={bk.item.id} book={bk.item} w={bk.w} />
            ))}
            {JumpNew(w)}
        </div>
    )
}

interface one {
    w: number
    book: book_vo
}
function Item(p: one) {
    return (
        <div
            className={css(s.Item)}
            style={{
                width: p.w + 'px',
            }}
        >
            <div className={css(style_item.name)}>{p.book.name}</div>
            <div className={css(style_item.btn_box)}>
                <div
                    className={css(style_item.line)}
                    onClick={() => {
                        console.log('打开书')
                        ipc().send('book_open_child_window', p.book)
                    }}
                >
                    编写
                </div>
                <div
                    className={css(style_item.line)}
                    onClick={() => {
                        SubBook.edit$.next(p.book)
                        Rt.next('shelf', Rt.l2shelf.edit.en)
                    }}
                >
                    设置
                </div>
                <div
                    className={css(style_item.line)}
                    onClick={() => {
                        ipc().send('fs_show_in_folder', p.book.src)
                    }}
                >
                    打开资源管理器
                </div>
                <div
                    className={css(style_item.line)}
                    onClick={() => {
                        ipc().send('fs_vscode', p.book.src)
                    }}
                >
                    打开vscode
                </div>
                <div
                    className={css(style_item.line)}
                    style={{
                        color: 'red',
                    }}
                    onDoubleClick={() => {
                        ipc().sendSync('book_unlink', p.book)
                        setTimeout(() => {
                            //
                            SubOption.update_shelf()
                            SubBook.load()
                        }, 100)
                    }}
                >
                    移除
                    <span>(磁盘文件将会保留)</span>
                </div>
            </div>
        </div>
    )
}

function JumpNew(w: number) {
    return (
        <div
            className={css(s.Item)}
            style={{
                width: w + 'px',
            }}
            onClick={() => {
                Rt.next('shelf', Rt.l2shelf.edit.en)
            }}
        >
            <div className={css(s.JumpNew)}>
                <Icon iconName="Add" />
            </div>
        </div>
    )
}
