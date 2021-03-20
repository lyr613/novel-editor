import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { style as s } from './style'
import { StyleComp } from 'style-/comp'
import { useObservable } from 'rxjs-hooks'
import { _cube_set2 } from './subj'

/** LeftGroup */
export default function MidItem() {
    const items = useObservable(() => _cube_set2.l2_can_show_li$, [])
    const selm = useObservable(() => _cube_set2.seled_l2_map$, new Map())

    return (
        <div className={css(s.MidItem)}>
            {items.map((item, i) => (
                <CubeItemItem key={item.id} sel_map={selm} index={i} item={item} />
            ))}
        </div>
    )
}

interface p {
    index: number
    item: cube_item_vo
    sel_map: Map<string, boolean>
}
function CubeItemItem(p: p) {
    return (
        <div
            className={css(
                StyleComp.select_item.item,
                p.sel_map.get(p.item.id) ? StyleComp.select_item.high : null,
                s.CubeItemItem,
            )}
            onClick={(e) => {
                _cube_set2.click_l2(e, p.item.id)
            }}
        >
            <div>{p.item.name}</div>
            <div className={css(s.CubeItemRemark)}>{p.item.remark}</div>
        </div>
    )
}
