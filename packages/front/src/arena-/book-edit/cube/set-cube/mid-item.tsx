import React, { useState, useEffect } from 'react'
import { css } from 'aphrodite/no-important'
import { style as s } from './style'
import { StyleComp } from 'style-/comp'
import { useObservable } from 'rxjs-hooks'
import { _cube_set } from './subj'

/** LeftGroup */
export default function MidItem() {
    const items = useObservable(() => _cube_set.show_l2s$, [])
    const seled = useObservable(() => _cube_set.seled_l2$, [-1, -1])
    const min = Math.min(...seled)
    const max = Math.max(...seled)

    return (
        <div className={css(s.MidItem)}>
            {items.map((item, i) => (
                <CubeItemItem key={item.id} mini={min} maxi={max} index={i} item={item} />
            ))}
        </div>
    )
}

interface p {
    mini: number
    maxi: number
    index: number
    item: cube_item_vo
}
function CubeItemItem(p: p) {
    const high_light = p.mini <= p.index && p.index <= p.maxi

    return (
        <div
            className={css(StyleComp.select_item.item, high_light ? StyleComp.select_item.high : null, s.CubeItemItem)}
            onClick={(e) => {
                // console.log(e)
                _cube_set.now_sel$.next('l2')
                const sh = e.shiftKey
                if (!sh) {
                    _cube_set.seled_l2$.next([p.index, p.index])
                    return
                }
                const n2 = _cube_set.seled_l2$.value
                const diff0 = Math.abs(n2[0] - p.index)
                const diff1 = Math.abs(n2[1] - p.index)
                if (diff0 > diff1) {
                    _cube_set.seled_l2$.next([n2[0], p.index])
                } else {
                    _cube_set.seled_l2$.next([n2[1], p.index])
                }
            }}
        >
            <div>{p.item.name}</div>
            <div className={css(s.CubeItemRemark)}>{p.item.remark}</div>
        </div>
    )
}
