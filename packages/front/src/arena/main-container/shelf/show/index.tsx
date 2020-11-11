import React, { useState, useEffect, Suspense } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from 'style/global'
import { style as s } from './style'

/** Show */
export default function Show() {
    const [wh, next_wh] = useState(null as null | number[])
    const [column_num, next_column_num] = useState(0)
    useEffect(() => {
        const [W, H] = [window.innerWidth - 20, window.innerHeight]
        const lmt = 300 // 生成低于此的最接近宽度
        if (W <= lmt) {
            next_wh(null)
        }
        let k = 1
        let w = W
        while (w > lmt) {
            k++
            w = (W / k) | 0
        }
        const h = (w - 20) * 1.5
        next_wh([w, h])
        next_column_num(k)
        console.log(w)
    }, [])
    return (
        <div className={css(s.Show)}>
            <Suspense fallback={null}>{wh && <List wh={wh} column_num={column_num} />}</Suspense>
        </div>
    )
}

interface list {
    wh: number[]
    column_num: number
}
function List(p: list) {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${p.column_num}, auto)`,
                boxSizing: 'border-box',
                width: '100vw',
                gap: 20,
                padding: 20,
            }}
        >
            {[1, 2, 3, 5, 6, 7, 8, 9, 11, 12, 13].map((n) => (
                <div
                    key={n}
                    style={{
                        boxSizing: 'border-box',
                        width: '100%',
                        height: p.wh[1] + 'px',
                        backgroundColor: 'red',
                    }}
                ></div>
            ))}
        </div>
    )
}
