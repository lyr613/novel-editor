import React, { useState, useEffect, Suspense } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from 'style-/global'
import { style as s, style_item } from './style'
import { screen$ } from 'subject-/screen'
import { themes } from 'style-/theme'
import { SubBook } from 'subject-/book'
import { useObservable } from 'rxjs-hooks'
import { ipc } from 'tool-/electron'
import { Rt } from 'router-'
import { Icon } from '@fluentui/react'

/** Show */
export default function Show() {
    // [列数, 宽, 高]
    const [item_size, next_item_size] = useState(null as null | number[])
    useEffect(() => {
        const ob = screen$(300).subscribe((WH) => {
            const W = WH.W - 20
            const lmt = 300 // 生成低于此的最接近宽度
            if (W <= lmt) {
                next_item_size([0, 0, 0])
                return
            }
            let col = 1
            let w = W
            while (w > lmt) {
                col++
                w = (W / col) | 0
            }
            const h = (w - 20) * 1.5
            next_item_size([col, w, h])
            console.log('书item宽度', w)
        })
        // const [W, H] = [window.innerWidth - 20, window.innerHeight]
        return () => {
            ob.unsubscribe()
        }
    }, [])
    useEffect(() => {
        setTimeout(() => {
            SubBook.load()
        }, 17)
    }, [])
    return (
        <div className={css(s.Show)}>
            <Suspense fallback={null}>{item_size && <List item_size={item_size} />}</Suspense>
        </div>
    )
}

interface list {
    item_size: number[]
}
function List(p: list) {
    const [col, iw, ih] = p.item_size
    const li = useObservable(() => SubBook.li$, [])
    if (col < 1) {
        return <div>窗口尺寸太小了</div>
    }
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${col}, auto)`,
                boxSizing: 'border-box',
                gap: 20,
                padding: 20,
            }}
        >
            {li.map((bk, i) => (
                <Item key={bk.id} ih={ih} book={bk} />
            ))}
            {JumpNew(ih)}
        </div>
    )
}

interface one {
    ih: number
    book: book_vo
}
function Item(p: one) {
    return (
        <div
            className={css(s.Item)}
            style={{
                height: p.ih + 'px',
            }}
            onClick={() => {
                console.log('打开书')
                ipc().send('book_open_child_window', p.book)
            }}
        >
            <div className={css(style_item.name)}>{p.book.name}</div>
            <div className={css(style_item.btn_box)}>
                <div className={css(style_item.line)}></div>
            </div>
        </div>
    )
}

function JumpNew(h: number) {
    return (
        <div
            className={css(s.Item)}
            style={{
                height: h + 'px',
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
