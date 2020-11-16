import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
// import { global_style as gs, style_creater as sc } from '@/style/global'
import { style as s } from './style'

interface item_vo {
    key: string
    data: any
}
export interface LabelBarOption {
    items: item_vo[]
    hook_select_end?: (item: item_vo) => void
}
/** LabelBar */
export default function LabelBar(p: LabelBarOption) {
    const { items, hook_select_end } = p
    const [use, next_use] = useState(items[0])
    return (
        <div className={css(s.LabelBar)}>
            {items.map((it) => (
                <div
                    key={it.key}
                    className={css(s.LabelItem, use?.key === it.key && s.LabelItemUse)}
                    onClick={() => {
                        next_use(it)
                        if (hook_select_end) {
                            hook_select_end(it)
                        }
                    }}
                >
                    {it.key}
                </div>
            ))}
        </div>
    )
}
