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
    /** 根据此进行高亮 */
    use_key: string
    default_key?: string
    /** 点击触发, 参数为item */
    on_item_click?: (item: item_vo) => void
}
/** LabelBar */
export default function LabelBar(p: LabelBarOption) {
    const { items, on_item_click } = p
    const use_key = p.default_key || p.use_key
    return (
        <div className={css(s.LabelBar)}>
            {items.map((it) => (
                <div
                    key={it.key}
                    className={css(s.LabelItem, use_key === it.key && s.LabelItemUse)}
                    onClick={() => {
                        if (on_item_click) {
                            on_item_click(it)
                        }
                    }}
                >
                    {it.key}
                </div>
            ))}
        </div>
    )
}
