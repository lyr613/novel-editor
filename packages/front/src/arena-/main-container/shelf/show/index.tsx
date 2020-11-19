import React, { useState, useEffect, Suspense } from 'react'
import { css } from 'aphrodite/no-important'
import { global_style as gs, style_creater as sc } from 'style-/global'
import { style as s } from './style'
import { screen$ } from 'subject-/screen'
import { themes } from 'style-/theme'

/** Show */
export default function Show() {
    // [列数, 宽, 高]
    const [item_size, next_item_size] = useState(null as null | number[])
    useEffect(() => {
        const ob = screen$(1500).subscribe((WH) => {
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
            console.log(w)
        })
        // const [W, H] = [window.innerWidth - 20, window.innerHeight]
        return () => {
            ob.unsubscribe()
        }
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
    if (col < 1) {
        return <div>窗口尺寸太小了</div>
    }
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${col}, auto)`,
                boxSizing: 'border-box',
                // width: '100vw',
                gap: 20,
                padding: 20,
            }}
        >
            {Array(21)
                .fill(1)
                .map((n, i) => (
                    <div
                        key={i}
                        style={{
                            position: 'relative',
                            boxSizing: 'border-box',
                            width: '100%',
                            height: ih + 'px',
                            backgroundColor: themes.style_vars.themeDark,
                        }}
                    >
                        <div className={css(s.ItemName)}>书名太长了怎</div>
                    </div>
                ))}
        </div>
    )
}
